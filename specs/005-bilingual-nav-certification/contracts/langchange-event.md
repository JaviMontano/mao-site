# Contract: langchange CustomEvent

## Event Specification

**Name**: `langchange`
**Target**: `document`
**Type**: `CustomEvent`
**Dispatched by**: `i18n.setLang()` in `js/i18n/i18n.js`
**Consumed by**: `SiteHeader.setupFloatingNav()` in `components/SiteHeader.js`

## Detail Schema

```javascript
{
  detail: {
    lang: string  // "es" | "en" — the new active language
  }
}
```

## Dispatch Point

After `applyTranslations(lang)` resolves successfully in `setLang()`:

```javascript
// In i18n.js setLang()
return applyTranslations(lang).then(function () {
  document.dispatchEvent(new CustomEvent('langchange', {
    detail: { lang: lang }
  }));
});
```

## Listener Contract

The floating nav listener:
1. Waits for DOM translations to complete (event fires after `applyTranslations`)
2. Queries all section heading elements by stored IDs
3. Re-reads `textContent` (now translated) into floating nav link labels
4. Re-translates floating nav's own `data-i18n-*` attributes via `i18n.translate(nav)`

## Guarantees

- Event fires only after successful translation (not on error)
- Event fires only when language actually changes (not on same-language call)
- `detail.lang` is always a valid SUPPORTED language code
- DOM elements referenced by floating nav are already translated when event fires

## Backward Compatibility

- No existing code listens for `langchange` — zero breaking changes
- `setLang()` return value (Promise) unchanged
- Any future component can listen for `langchange` without modifying i18n.js
