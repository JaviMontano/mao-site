# Quickstart: Bilingual & Floating Nav Certification

## Test Scenarios

### Floating Nav i18n (Phase 1)

```bash
# Unit test: langchange event is dispatched
npx vitest run tests/unit/i18n-certification.test.js -t "langchange"

# E2E: floating nav labels translate on ruta page
npx playwright test tests/e2e/bilingual-certification.spec.js -g "floating nav"
```

**Manual verification**:
1. `npx serve .` → open `localhost:3000/ruta/`
2. Scroll past header — floating nav appears with Spanish labels
3. Click EN toggle — floating nav labels should update to English
4. Click ES toggle — labels revert to Spanish

### Certification Suite — Static (Phase 2)

```bash
# Run all static certification checks
npx vitest run tests/unit/i18n-certification.test.js

# Expected output:
# ✓ every data-i18n key has en.json entry
# ✓ no orphaned en.json keys
# ✓ coverage per level: L1=X%, L2=X%, L3=X%, L4=X%, L5=X%
# ⚠ N pages with SiteHeader but zero data-i18n keys (warnings)
```

### Certification Suite — Rendered (Phase 3)

```bash
# Run L1 remnant detection (requires dev server)
npx playwright test tests/e2e/bilingual-certification.spec.js

# Expected: 4 L1 pages, zero Spanish remnants in EN mode
```

### Full Certification Run

```bash
# Static + rendered together
npx vitest run tests/unit/i18n-certification.test.js && \
npx playwright test tests/e2e/bilingual-certification.spec.js
```

## Key Files to Watch

| File | What changes |
|------|-------------|
| `js/i18n/i18n.js` | `setLang()` gains `langchange` event dispatch |
| `components/SiteHeader.js` | `setupFloatingNav()` gains `langchange` listener |
| `js/i18n/en.json` | New `<page>.nav.*` keys; expanded coverage |
| `js/i18n/es.json` | Matching keys for new en.json entries |
| `data/i18n-levels.json` | Page→level classification manifest |

## Debugging Tips

- **Floating nav not updating**: Check browser console for `langchange`
  event — `document.addEventListener('langchange', e => console.log(e.detail))`
- **Certification false positives**: Check `data/i18n-allowlist.json` for
  missing identical terms
- **Missing keys**: Run `npx vitest run -t "missing keys"` for detailed report
