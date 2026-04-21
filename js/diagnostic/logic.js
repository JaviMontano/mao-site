/**
 * Diagnostic Logic — Pure scoring + threshold engine
 *
 * Loads the diagnostic contract and exposes five pure functions:
 *   computeScore, getThreshold, getRecommendation, getQuestions, validateAnswers
 *
 * For testability the factory `createDiagnosticLogic(contract)` accepts
 * the contract object via dependency injection. The default singleton exports
 * bind to the embedded contract JSON.
 *
 * @module js/diagnostic/logic
 * @see specs/009-home-landing-sales/contracts/diagnostic-logic.json
 */

// Static import of the contract JSON (works in Vitest; for browser use, the
// controller can pass the contract via createDiagnosticLogic instead).
import defaultContract from '../../specs/009-home-landing-sales/contracts/diagnostic-logic.json' with { type: 'json' };

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const SUPPORTED_LOCALES = ['es', 'en'];
const DEFAULT_LOCALE = 'es';

/**
 * Return only the scored questions (excludes PII-capture steps).
 * @param {Array} questions - raw questions array from contract
 * @returns {Array}
 */
function scoredQuestions(questions) {
  return questions.filter((q) => !q.kind);
}

/**
 * Build a lookup map: questionId → { optionId → weight }
 */
function buildWeightMap(questions) {
  const map = {};
  for (const q of scoredQuestions(questions)) {
    map[q.id] = {};
    for (const opt of q.options) {
      map[q.id][opt.id] = opt.weight;
    }
  }
  return map;
}

/* ------------------------------------------------------------------ */
/*  Factory                                                           */
/* ------------------------------------------------------------------ */

/**
 * Create a diagnostic logic API bound to a specific contract config.
 *
 * @param {object} contract - parsed diagnostic-logic.json
 * @returns {{ computeScore, getThreshold, getRecommendation, getQuestions, validateAnswers }}
 */
export function createDiagnosticLogic(contract) {
  // --- Validation of contract structure ---
  if (
    !contract ||
    !Array.isArray(contract.questions) ||
    contract.questions.length === 0 ||
    !Array.isArray(contract.thresholds) ||
    !contract.recommendations ||
    !contract.scoring
  ) {
    throw new Error('Invalid diagnostic contract: missing required fields');
  }

  const scored = scoredQuestions(contract.questions);
  const weightMap = buildWeightMap(contract.questions);
  const scoredIds = scored.map((q) => q.id);

  /* --- computeScore ------------------------------------------------ */

  function computeScore(answers) {
    let total = 0;
    for (const qId of scoredIds) {
      const answerId = answers[qId];
      if (answerId === undefined || answerId === null) continue; // validateAnswers handles missing
      const opts = weightMap[qId];
      if (!(answerId in opts)) {
        throw new Error(`Invalid answer "${answerId}" for question "${qId}"`);
      }
      total += opts[answerId];
    }
    return total;
  }

  /* --- getThreshold ------------------------------------------------ */

  function getThreshold(score) {
    if (!Number.isInteger(score)) {
      throw new Error(`Score must be an integer, got ${score}`);
    }
    if (score < contract.scoring.range.min || score > contract.scoring.range.max) {
      throw new Error(
        `Score ${score} out of range [${contract.scoring.range.min}, ${contract.scoring.range.max}]`
      );
    }
    const match = contract.thresholds.find((t) => score >= t.min && score <= t.max);
    if (!match) {
      throw new Error(`No threshold found for score ${score}`);
    }
    return { ...match };
  }

  /* --- getRecommendation ------------------------------------------- */

  function getRecommendation(nivelId) {
    const rec = contract.recommendations[nivelId];
    if (!rec) {
      throw new Error(`Unknown nivel_id "${nivelId}"`);
    }
    return { ...rec };
  }

  /* --- getQuestions ------------------------------------------------- */

  function getQuestions(locale) {
    const loc = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
    return scored.map((q) => ({
      step: q.step,
      id: q.id,
      prompt: q.prompt[loc],
      options: q.options.map((opt) => ({
        id: opt.id,
        weight: opt.weight,
        label: opt.label[loc],
      })),
    }));
  }

  /* --- validateAnswers --------------------------------------------- */

  function validateAnswers(answers) {
    if (!answers || typeof answers !== 'object') {
      return { valid: false, missing: [...scoredIds] };
    }
    const missing = scoredIds.filter((id) => !(id in answers));
    return { valid: missing.length === 0, missing };
  }

  return { computeScore, getThreshold, getRecommendation, getQuestions, validateAnswers };
}

/* ------------------------------------------------------------------ */
/*  Default singleton (bound to embedded contract)                    */
/* ------------------------------------------------------------------ */

const _default = createDiagnosticLogic(defaultContract);

export const computeScore = _default.computeScore;
export const getThreshold = _default.getThreshold;
export const getRecommendation = _default.getRecommendation;
export const getQuestions = _default.getQuestions;
export const validateAnswers = _default.validateAnswers;
