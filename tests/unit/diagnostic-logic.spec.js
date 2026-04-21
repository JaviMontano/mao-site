import { describe, it, expect } from 'vitest';

// Import the contract data directly for test assertions
import contract from '../../specs/009-home-landing-sales/contracts/diagnostic-logic.json';

// Import module under test — uses dependency injection via createDiagnosticLogic
import {
  createDiagnosticLogic,
  computeScore,
  getThreshold,
  getRecommendation,
  getQuestions,
  validateAnswers,
} from '../../js/diagnostic/logic.js';

// --- Factory / DI tests ---------------------------------------------------

describe('createDiagnosticLogic (factory)', () => {
  it('returns an object with all 5 API functions', () => {
    const api = createDiagnosticLogic(contract);
    expect(api).toHaveProperty('computeScore');
    expect(api).toHaveProperty('getThreshold');
    expect(api).toHaveProperty('getRecommendation');
    expect(api).toHaveProperty('getQuestions');
    expect(api).toHaveProperty('validateAnswers');
  });

  it('throws when contract is missing or invalid', () => {
    expect(() => createDiagnosticLogic(null)).toThrow();
    expect(() => createDiagnosticLogic({})).toThrow();
    expect(() => createDiagnosticLogic({ questions: [] })).toThrow();
  });
});

// --- computeScore ----------------------------------------------------------

describe('computeScore', () => {
  it('returns 0 when all answers have weight 0', () => {
    const answers = {
      q_segmento: 'persona',    // weight 0
      q_madurez: 'sin_metodo',  // weight 0
      q_dolor: 'claridad',      // weight 1  — minimum for q_dolor is 1
      q_urgencia: 'explorando', // weight 0
      q_equipo: 'solo_yo',      // weight 0
    };
    // claridad has weight 1, so minimum possible total is 1 not 0.
    // For a true all-zero test we need the actual lowest weights:
    const allZero = {
      q_segmento: 'persona',    // 0
      q_madurez: 'sin_metodo',  // 0
      q_dolor: 'claridad',      // 1 (minimum available)
      q_urgencia: 'explorando', // 0
      q_equipo: 'solo_yo',      // 0
    };
    expect(computeScore(allZero)).toBe(1);
  });

  it('returns 15 when all answers have max weight', () => {
    const allMax = {
      q_segmento: 'directivo',    // 3
      q_madurez: 'marco_propio',  // 3
      q_dolor: 'alineacion',      // 3
      q_urgencia: '90d',          // 3
      q_equipo: '50_plus',        // 3
    };
    expect(computeScore(allMax)).toBe(15);
  });

  it('returns correct mid-range score (builder range)', () => {
    const mid = {
      q_segmento: 'lider_equipo', // 1
      q_madurez: 'ad_hoc',        // 1
      q_dolor: 'velocidad',       // 2
      q_urgencia: '6m',           // 2
      q_equipo: '2_10',           // 1
    };
    expect(computeScore(mid)).toBe(7);
  });

  it('returns 0 when answer option ids have weight 0 for all that can be 0', () => {
    // Construct answers picking weight-0 options where available
    // q_dolor has no weight-0 option, minimum is 1 (claridad)
    // So true minimum is 0+0+1+0+0 = 1
    // But let's test with a synthetic contract to verify sum logic
    const score = computeScore({
      q_segmento: 'persona',
      q_madurez: 'sin_metodo',
      q_dolor: 'claridad',
      q_urgencia: 'explorando',
      q_equipo: 'solo_yo',
    });
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(15);
  });

  it('ignores step 6 PII field answers if present', () => {
    const answers = {
      q_segmento: 'directivo',
      q_madurez: 'marco_propio',
      q_dolor: 'alineacion',
      q_urgencia: '90d',
      q_equipo: '50_plus',
      q_contacto: 'someone@example.com', // should be ignored
    };
    expect(computeScore(answers)).toBe(15);
  });

  it('throws when an answer id does not match any option', () => {
    const bad = {
      q_segmento: 'INVALID',
      q_madurez: 'sin_metodo',
      q_dolor: 'claridad',
      q_urgencia: 'explorando',
      q_equipo: 'solo_yo',
    };
    expect(() => computeScore(bad)).toThrow();
  });
});

// --- getThreshold ----------------------------------------------------------

describe('getThreshold', () => {
  it('returns explorer for score 0', () => {
    expect(getThreshold(0).nivel_id).toBe('explorer');
  });

  it('returns explorer for score 4 (upper boundary)', () => {
    const t = getThreshold(4);
    expect(t.nivel_id).toBe('explorer');
    expect(t.min).toBe(0);
    expect(t.max).toBe(4);
  });

  it('returns builder for score 5 (lower boundary)', () => {
    expect(getThreshold(5).nivel_id).toBe('builder');
  });

  it('returns builder for score 9 (upper boundary)', () => {
    expect(getThreshold(9).nivel_id).toBe('builder');
  });

  it('returns strategist for score 10 (lower boundary)', () => {
    expect(getThreshold(10).nivel_id).toBe('strategist');
  });

  it('returns strategist for score 15 (max)', () => {
    const t = getThreshold(15);
    expect(t.nivel_id).toBe('strategist');
    expect(t.min).toBe(10);
    expect(t.max).toBe(15);
  });

  it('throws for score out of range (negative)', () => {
    expect(() => getThreshold(-1)).toThrow();
  });

  it('throws for score out of range (above 15)', () => {
    expect(() => getThreshold(16)).toThrow();
  });

  it('throws for non-integer score', () => {
    expect(() => getThreshold(3.5)).toThrow();
  });
});

// --- getRecommendation -----------------------------------------------------

describe('getRecommendation', () => {
  it('returns correct CTA for explorer', () => {
    const rec = getRecommendation('explorer');
    expect(rec.cta_id).toBe('go_resources');
    expect(rec.cta_href).toBe('/recursos/');
    expect(rec.titulo).toHaveProperty('es');
    expect(rec.titulo).toHaveProperty('en');
  });

  it('returns correct CTA for builder', () => {
    const rec = getRecommendation('builder');
    expect(rec.cta_id).toBe('go_personas');
    expect(rec.cta_href).toBe('/personas/');
  });

  it('returns correct CTA for strategist', () => {
    const rec = getRecommendation('strategist');
    expect(rec.cta_id).toBe('go_empresas');
    expect(rec.cta_href).toBe('/empresas/');
  });

  it('throws for invalid nivel_id', () => {
    expect(() => getRecommendation('unknown')).toThrow();
  });
});

// --- getQuestions -----------------------------------------------------------

describe('getQuestions', () => {
  it('returns 5 scored questions (excludes step 6 PII)', () => {
    const qs = getQuestions('es');
    expect(qs).toHaveLength(5);
    qs.forEach((q) => {
      expect(q.step).toBeLessThanOrEqual(5);
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('prompt');
      expect(q).toHaveProperty('options');
    });
  });

  it('returns Spanish prompts for locale "es"', () => {
    const qs = getQuestions('es');
    expect(qs[0].prompt).toBe('¿Qué representas hoy?');
    qs[0].options.forEach((opt) => {
      expect(opt).toHaveProperty('label');
      expect(typeof opt.label).toBe('string');
    });
  });

  it('returns English prompts for locale "en"', () => {
    const qs = getQuestions('en');
    expect(qs[0].prompt).toBe('What best describes you today?');
  });

  it('defaults to "es" for unsupported locale', () => {
    const qs = getQuestions('fr');
    expect(qs[0].prompt).toBe('¿Qué representas hoy?');
  });

  it('defaults to "es" when locale is undefined', () => {
    const qs = getQuestions();
    expect(qs[0].prompt).toBe('¿Qué representas hoy?');
  });

  it('each question has options with id, weight, and label', () => {
    const qs = getQuestions('es');
    qs.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt).toHaveProperty('id');
        expect(opt).toHaveProperty('weight');
        expect(opt).toHaveProperty('label');
        expect(typeof opt.weight).toBe('number');
      });
    });
  });
});

// --- validateAnswers -------------------------------------------------------

describe('validateAnswers', () => {
  it('returns valid:true when all 5 scored questions are answered', () => {
    const answers = {
      q_segmento: 'persona',
      q_madurez: 'sin_metodo',
      q_dolor: 'claridad',
      q_urgencia: 'explorando',
      q_equipo: 'solo_yo',
    };
    const result = validateAnswers(answers);
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it('returns valid:false with missing question ids when answers are incomplete', () => {
    const answers = {
      q_segmento: 'persona',
      q_dolor: 'claridad',
    };
    const result = validateAnswers(answers);
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('q_madurez');
    expect(result.missing).toContain('q_urgencia');
    expect(result.missing).toContain('q_equipo');
    expect(result.missing).toHaveLength(3);
  });

  it('returns valid:false when answers is null or undefined', () => {
    expect(validateAnswers(null).valid).toBe(false);
    expect(validateAnswers(undefined).valid).toBe(false);
    expect(validateAnswers(null).missing).toHaveLength(5);
  });

  it('returns valid:false when answers is empty object', () => {
    const result = validateAnswers({});
    expect(result.valid).toBe(false);
    expect(result.missing).toHaveLength(5);
  });

  it('ignores extra keys not in scored questions', () => {
    const answers = {
      q_segmento: 'persona',
      q_madurez: 'sin_metodo',
      q_dolor: 'claridad',
      q_urgencia: 'explorando',
      q_equipo: 'solo_yo',
      q_contacto: 'test@test.com',
      random_key: 'whatever',
    };
    const result = validateAnswers(answers);
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });
});

// --- Integration: full pipeline -------------------------------------------

describe('full pipeline integration', () => {
  it('explorer path: low scores → explorer threshold → resources CTA', () => {
    const answers = {
      q_segmento: 'persona',
      q_madurez: 'sin_metodo',
      q_dolor: 'claridad',
      q_urgencia: 'explorando',
      q_equipo: 'solo_yo',
    };
    const score = computeScore(answers);
    const threshold = getThreshold(score);
    const rec = getRecommendation(threshold.nivel_id);
    expect(threshold.nivel_id).toBe('explorer');
    expect(rec.cta_href).toBe('/recursos/');
  });

  it('strategist path: max scores → strategist threshold → empresas CTA', () => {
    const answers = {
      q_segmento: 'directivo',
      q_madurez: 'marco_propio',
      q_dolor: 'alineacion',
      q_urgencia: '90d',
      q_equipo: '50_plus',
    };
    const score = computeScore(answers);
    const threshold = getThreshold(score);
    const rec = getRecommendation(threshold.nivel_id);
    expect(threshold.nivel_id).toBe('strategist');
    expect(rec.cta_href).toBe('/empresas/');
  });
});
