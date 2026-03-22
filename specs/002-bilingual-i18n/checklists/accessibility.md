# Accessibility Checklist — 002-bilingual-i18n

## Toggle Accessibility
- [x] Toggle uses semantic button elements (not divs) [Constitution II, Plan §Toggle]
- [x] Toggle has role="radiogroup" with aria-label [Constitution II, Plan §Toggle]
- [x] Each toggle button has aria-pressed state [Constitution II, Plan §Toggle]
- [x] Toggle is keyboard-navigable (Tab to reach, Enter/Space to activate) [Constitution II, Spec US-1.4]
- [x] Focus ring visible on toggle buttons [Constitution II]
- [x] Toggle provides visual indication of active language (not color-only) [Constitution II]

## Language Attribute
- [x] html lang attribute updates when language changes (lang="es" / lang="en") [Spec FR-004]
- [x] Screen readers announce language change context [Constitution II]

## Translation Quality
- [x] Translated ARIA labels maintain semantic meaning [Constitution II, Spec FR-005]
- [x] Translated alt text is meaningful (not literal machine translation) [Constitution II]
- [x] Skip-to-content link translated ("Skip to main content") [Constitution II, SiteHeader]

## Graceful Degradation
- [x] If i18n.js fails to load, page remains fully usable in Spanish [Spec §Edge Cases]
- [x] If translation key missing, original Spanish text preserved (no blank elements) [Spec FR-006]
- [x] Toggle hidden gracefully if JS disabled (progressive enhancement) [Constitution II]
