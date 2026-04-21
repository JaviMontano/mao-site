import { describe, it, expect } from 'vitest';
import { resolveSlot, resolveAllSlots } from '../../js/blueprint/slot-resolver.js';

// Mock dictionaries: nested structure {pageSlug}.{slotId}.{audience}.{locale}
const dictionaries = {
  home: {
    hero: {
      empresa: {
        en: 'Enterprise Hero EN',
        es: 'Enterprise Hero ES',
      },
      persona: {
        en: 'Persona Hero EN',
        es: 'Persona Hero ES',
      },
    },
    cta: {
      empresa: {
        en: 'Enterprise CTA EN',
        es: 'Enterprise CTA ES',
      },
      persona: {
        en: 'Persona CTA EN',
        es: 'Persona CTA ES',
      },
    },
    tagline: {
      persona: {
        es: 'Solo tagline persona ES',
      },
    },
  },
};

// Mock Firestore slots
const firestoreSlots = {
  home: {
    hero: 'Firestore Hero Override',
    cta: 'Firestore CTA Override',
  },
};

describe('slot-resolver', () => {
  // ─── resolveSlot ───────────────────────────────────────────────

  describe('resolveSlot', () => {
    // 1. Exact match: home.hero.empresa.en
    it('returns exact match when all keys exist', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'en', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('Enterprise Hero EN');
    });

    // 2. Locale fallback: home.hero.empresa.fr → falls to empresa.es
    it('falls back to ES locale when requested locale is missing', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'fr', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('Enterprise Hero ES');
    });

    // 3. Audience fallback: home.hero.unknown.en → falls to persona.en
    it('falls back to persona audience when requested audience is missing', () => {
      const result = resolveSlot('home', 'hero', 'unknown', 'en', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('Persona Hero EN');
    });

    // 4. Double fallback: home.hero.unknown.fr → falls to persona.es
    it('falls back to persona+ES when both audience and locale are missing', () => {
      const result = resolveSlot('home', 'hero', 'unknown', 'fr', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('Persona Hero ES');
    });

    // 5. Firestore override: cmsEnabled=true with firestoreSlots value
    it('returns Firestore value when cmsEnabled and doc exists', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'en', {
        dictionaries,
        firestoreSlots,
        cmsEnabled: true,
      });
      expect(result).toBe('Firestore Hero Override');
    });

    // 6. Firestore miss: cmsEnabled=true but no doc → dictionary fallback
    it('falls through to dictionary when cmsEnabled but Firestore has no value', () => {
      const result = resolveSlot('home', 'tagline', 'persona', 'es', {
        dictionaries,
        firestoreSlots,
        cmsEnabled: true,
      });
      expect(result).toBe('Solo tagline persona ES');
    });

    // 7. Missing slot: no match at any level → [MISSING: slotId]
    it('returns MISSING marker when no match found at any fallback level', () => {
      const result = resolveSlot('home', 'nonexistent', 'empresa', 'en', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('[MISSING: nonexistent]');
    });

    // Additional edge cases for coverage

    it('returns MISSING marker when page slug does not exist in dictionaries', () => {
      const result = resolveSlot('about', 'hero', 'empresa', 'en', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('[MISSING: hero]');
    });

    it('does NOT use Firestore when cmsEnabled is false even if slots exist', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'en', {
        dictionaries,
        firestoreSlots,
        cmsEnabled: false,
      });
      expect(result).toBe('Enterprise Hero EN');
    });

    it('Firestore miss on page level falls through to dictionary', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'en', {
        dictionaries,
        firestoreSlots: { other: { hero: 'Other page' } },
        cmsEnabled: true,
      });
      expect(result).toBe('Enterprise Hero EN');
    });

    it('handles empty dictionaries gracefully', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'en', {
        dictionaries: {},
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('[MISSING: hero]');
    });

    it('handles undefined options fields gracefully', () => {
      const result = resolveSlot('home', 'hero', 'empresa', 'en', {
        dictionaries,
      });
      expect(result).toBe('Enterprise Hero EN');
    });

    it('locale fallback works with persona audience too', () => {
      const result = resolveSlot('home', 'hero', 'persona', 'fr', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('Persona Hero ES');
    });

    it('audience fallback to persona skips non-persona audiences', () => {
      // "unknown" audience doesn't exist, should skip to persona, not empresa
      const result = resolveSlot('home', 'cta', 'unknown', 'es', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });
      expect(result).toBe('Persona CTA ES');
    });
  });

  // ─── resolveAllSlots ──────────────────────────────────────────

  describe('resolveAllSlots', () => {
    // 8. resolveAllSlots returns Map of all slots for a page
    it('returns a Map with all resolved slots for a page', () => {
      const result = resolveAllSlots('home', 'empresa', 'en', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });

      expect(result).toBeInstanceOf(Map);
      expect(result.get('hero')).toBe('Enterprise Hero EN');
      expect(result.get('cta')).toBe('Enterprise CTA EN');
      expect(result.get('tagline')).toBeDefined();
    });

    it('resolves each slot independently through the fallback cascade', () => {
      const result = resolveAllSlots('home', 'unknown', 'fr', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });

      expect(result).toBeInstanceOf(Map);
      // All should double-fallback to persona.es
      expect(result.get('hero')).toBe('Persona Hero ES');
      expect(result.get('cta')).toBe('Persona CTA ES');
      expect(result.get('tagline')).toBe('Solo tagline persona ES');
    });

    it('includes Firestore overrides when cmsEnabled', () => {
      const result = resolveAllSlots('home', 'empresa', 'en', {
        dictionaries,
        firestoreSlots,
        cmsEnabled: true,
      });

      expect(result).toBeInstanceOf(Map);
      expect(result.get('hero')).toBe('Firestore Hero Override');
      expect(result.get('cta')).toBe('Firestore CTA Override');
    });

    it('returns empty Map when page slug does not exist', () => {
      const result = resolveAllSlots('nonexistent', 'empresa', 'en', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0);
    });

    it('contains all slot IDs from the dictionary for the page', () => {
      const result = resolveAllSlots('home', 'persona', 'es', {
        dictionaries,
        firestoreSlots: {},
        cmsEnabled: false,
      });

      expect(result).toBeInstanceOf(Map);
      const keys = [...result.keys()];
      expect(keys).toContain('hero');
      expect(keys).toContain('cta');
      expect(keys).toContain('tagline');
      expect(keys.length).toBe(3);
    });
  });
});
