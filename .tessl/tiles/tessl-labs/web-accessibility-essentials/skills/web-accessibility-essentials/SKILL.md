---
name: web-accessibility-essentials
description: >-
  Every UI component must be accessible from the start — not as an afterthought.
  Apply ARIA landmarks, form labels, keyboard navigation, focus management, live
  regions, semantic HTML, heading hierarchy, alt text, and color contrast whenever
  you build or modify any HTML, React component, Vue component, Svelte component,
  Angular template, or frontend UI. This applies to ALL frontend work — even when
  the user does not mention accessibility.
keywords: accessibility, a11y, aria, wcag, keyboard navigation, screen reader,
  focus management, aria-label, aria-live, semantic html, form labels, skip link,
  focus trap, landmark, role, tab order, aria-describedby, contrast, heading hierarchy,
  alt text, aria-required, aria-invalid, role alert, focus-visible
license: MIT
---

# Web Accessibility Essentials

**Accessibility is not optional.** Every component you build must be accessible by default. Do not wait for the user to ask for accessibility — apply these patterns proactively whenever you create or modify any UI.

---

## The Golden Rule

**Every time you create or modify a UI component, you MUST proactively include accessibility.** This means:

1. Semantic HTML elements (not div soup)
2. Proper labels on every form input
3. Keyboard navigability for every interactive element
4. Screen reader announcements for dynamic content
5. Heading hierarchy that makes sense
6. Alt text on every image

If the user asks you to "build a contact form" — they get labels, aria-required, aria-invalid, aria-describedby for errors, role="alert" on error messages, and fieldset/legend for groups. Every time. No exceptions.

---

## Page Structure and Semantic HTML

Use semantic HTML elements instead of generic `<div>` elements. Screen readers depend on these to navigate.

**Required for every page/layout:**
- `<header>` for the top section (not `<div class="header">`)
- `<nav>` with `aria-label` for navigation sections (not `<div class="nav">`)
- `<main>` for primary content (not `<div class="content">`)
- `<footer>` for the bottom section (not `<div class="footer">`)
- `<section>` with heading or `aria-label` for distinct content areas
- Skip-to-content link as the first focusable element

```html
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>

  <header>
    <nav aria-label="Main navigation">
      <a href="/" aria-current="page">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main id="main-content">
    <h1>Page Title</h1>
    <!-- Page content -->
  </main>

  <footer>
    <!-- Footer content -->
  </footer>
</body>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  z-index: 100;
}
.skip-link:focus {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
}
```

### Heading Hierarchy

Headings must follow a logical hierarchy. Never skip levels.

- One `<h1>` per page (the page title)
- `<h2>` for major sections
- `<h3>` for subsections within `<h2>`
- Never use headings just for visual styling — use CSS instead

```html
<!-- CORRECT -->
<h1>Dashboard</h1>
<h2>Recent Orders</h2>
<h3>Order #1042</h3>

<!-- WRONG — skips h2 -->
<h1>Dashboard</h1>
<h3>Recent Orders</h3>
```

---

## Forms — The Most Common Accessibility Failure

Every form input MUST have a label. Every single one. No exceptions.

### Labels with for/id Linking

```html
<!-- Visible label — always preferred -->
<label for="user-email">Email address</label>
<input id="user-email" type="email" name="email"
       required aria-required="true"
       autocomplete="email">

<!-- Hidden label — only when design truly cannot show one -->
<label for="search-input" class="sr-only">Search</label>
<input id="search-input" type="search" placeholder="Search...">
<!-- OR -->
<input type="search" aria-label="Search" placeholder="Search...">
```

### Required Fields

Mark required fields with BOTH the HTML `required` attribute AND `aria-required="true"`:

```html
<label for="name">Full name <span aria-hidden="true">*</span></label>
<input id="name" type="text" required aria-required="true">
```

### Error Messages — Must Be Announced to Screen Readers

When validation fails, error messages MUST be:
1. Linked to the input via `aria-describedby`
2. Announced by screen readers via `role="alert"`
3. The input MUST have `aria-invalid="true"`

```html
<label for="email">Email</label>
<input id="email" type="email"
       aria-describedby="email-error"
       aria-invalid="true"
       aria-required="true">
<span id="email-error" role="alert">Please enter a valid email address</span>
```

In React/JSX:
```jsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-describedby={errors.email ? "email-error" : undefined}
  aria-invalid={!!errors.email}
  aria-required="true"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
{errors.email && (
  <span id="email-error" role="alert">{errors.email}</span>
)}
```

### Group Related Fields

Radio buttons and checkboxes MUST be wrapped in `<fieldset>` with `<legend>`:

```html
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
```

### Form Anti-Patterns — NEVER Do These

- NEVER use `placeholder` as the only label — it disappears when typing
- NEVER use `title` attribute as the only label
- NEVER rely on visual proximity alone — always use `for`/`id` or `aria-label`
- NEVER put a form input without any label mechanism

---

## Buttons and Links — Semantic Distinction

- `<button>` for actions (submit, toggle, delete, open modal)
- `<a href>` for navigation (going to a different page/URL)
- NEVER use `<div onclick>` or `<span onclick>` — they are not keyboard accessible

```html
<!-- Action = button -->
<button type="button" onClick={handleAddToCart}>Add to cart</button>
<button type="submit">Submit form</button>

<!-- Navigation = link -->
<a href="/orders/123">View order #123</a>

<!-- Icon-only buttons MUST have aria-label -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<button type="button" aria-label="Delete item">
  <svg aria-hidden="true"><!-- trash icon --></svg>
</button>
```

### Disabled State

```html
<button type="submit" disabled aria-disabled="true">
  Place order
</button>
```

---

## Images — Alt Text is Required

Every `<img>` MUST have an `alt` attribute:

- **Informative images:** Describe what the image shows: `alt="Golden retriever playing in a park"`
- **Decorative images:** Use empty alt: `alt=""`
- **Icons inside buttons/links:** The parent element needs the label, icon gets `aria-hidden="true"`

```html
<!-- Informative -->
<img src="product.jpg" alt="Blue ceramic coffee mug, 12oz">

<!-- Decorative -->
<img src="divider.png" alt="">

<!-- Icon in button — button has the label -->
<button aria-label="Settings">
  <img src="gear.svg" alt="" aria-hidden="true">
</button>
```

---

## Keyboard Navigation

### Every Interactive Element Must Be Keyboard Accessible

1. **Reachable** via Tab / Shift+Tab
2. **Operable** via Enter, Space, Escape, Arrow keys
3. **Visually indicated** when focused (`:focus-visible` style)

```css
/* ALWAYS provide visible focus styles */
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* NEVER do this without a replacement */
/* :focus { outline: none; }  <-- BREAKS ACCESSIBILITY */
```

### Custom Components Need tabindex

If you must use a non-semantic element (rare), add keyboard support:

```html
<div role="button" tabindex="0"
     onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
     onClick={handleClick}>
  Custom button
</div>
```

But strongly prefer `<button>` which gives you all of this for free.

---

## Modals and Dialogs

Modals MUST:
1. Have `role="dialog"` and `aria-modal="true"`
2. Have `aria-labelledby` pointing to the dialog title
3. Trap focus inside (Tab cycles within modal)
4. Close on Escape key
5. Return focus to the trigger element when closed

```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm deletion</h2>
  <p>Are you sure you want to delete this item?</p>
  <button type="button">Cancel</button>
  <button type="button">Delete</button>
  <button type="button" aria-label="Close dialog">&times;</button>
</div>
```

```typescript
function trapFocus(modal: HTMLElement) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0] as HTMLElement;
  const last = focusable[focusable.length - 1] as HTMLElement;

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  first.focus();
}
```

---

## Live Regions — Dynamic Content Updates

When content changes without a page reload, screen readers MUST be notified:

```html
<!-- Status updates — polite (waits for pause in speech) -->
<div aria-live="polite" aria-atomic="true">
  Order status: Preparing
</div>

<!-- Error messages — assertive (interrupts immediately) -->
<div role="alert">
  Payment failed. Please try again.
</div>

<!-- Toast/notification -->
<div role="status" aria-live="polite">
  Item added to cart
</div>

<!-- Loading state -->
<div aria-busy="true" aria-live="polite">
  Loading results...
</div>
```

| Pattern | Element | Use |
|---|---|---|
| Status update | `aria-live="polite"` | Non-urgent updates |
| Error message | `role="alert"` | Urgent errors, form validation |
| Toast | `role="status"` | Success messages, notifications |
| Loading | `aria-busy="true"` | While content is loading |

---

## Data Tables

Tables MUST have proper headers and captions:

```html
<table>
  <caption>Monthly sales report</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Units sold</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>150</td>
      <td>$4,500</td>
    </tr>
  </tbody>
</table>
```

---

## Color Contrast

- **Normal text:** minimum 4.5:1 contrast ratio against background
- **Large text (18px+ bold or 24px+):** minimum 3:1 contrast ratio
- **Never use color alone** to convey meaning — add icons, text, or patterns

```css
/* Good contrast */
.error-text {
  color: #d32f2f; /* Red text */
  /* Also include a visual indicator beyond just color */
}
.error-text::before {
  content: "⚠ ";
}
```

---

## Checklist — Apply to Every Component

**Every page/layout:**
- [ ] Uses `<header>`, `<nav>`, `<main>`, `<footer>` (not div soup)
- [ ] Has skip-to-content link
- [ ] Has single `<h1>`, logical heading hierarchy
- [ ] Has `:focus-visible` styles

**Every form:**
- [ ] Every input has `<label>` with `for`/`id` (or `htmlFor` in React)
- [ ] Required fields have `aria-required="true"`
- [ ] Error messages use `role="alert"` and are linked via `aria-describedby`
- [ ] Invalid fields have `aria-invalid="true"`
- [ ] Radio/checkbox groups in `<fieldset>` + `<legend>`

**Every interactive element:**
- [ ] Uses semantic element (`<button>`, `<a>`, not `<div onclick>`)
- [ ] Reachable by Tab, operable by keyboard
- [ ] Has visible focus indicator
- [ ] Has accessible name (text, `aria-label`, or `aria-labelledby`)
- [ ] Icon-only buttons have `aria-label`

**Every image:**
- [ ] Has `alt` attribute (descriptive or empty for decorative)
- [ ] Decorative icons use `aria-hidden="true"`

**Every modal:**
- [ ] Has `role="dialog"` and `aria-modal="true"`
- [ ] Has `aria-labelledby` pointing to title
- [ ] Traps focus, closes on Escape, returns focus on close

**Every dynamic update:**
- [ ] Status changes use `aria-live="polite"` or `role="status"`
- [ ] Errors use `role="alert"`
- [ ] Loading states use `aria-busy="true"`

## Verifiers

- [contact-form](../../verifiers/contact-form.json) — Build a contact form (proactive a11y check)
- [signup-page](../../verifiers/signup-page.json) — Build a signup page with form and layout
- [product-card](../../verifiers/product-card.json) — Build a product card component
- [notification-banner](../../verifiers/notification-banner.json) — Build a notification/alert banner
- [search-results-page](../../verifiers/search-results-page.json) — Build a search results page
- [settings-form](../../verifiers/settings-form.json) — Build a settings/preferences form
- [image-gallery](../../verifiers/image-gallery.json) — Build an image gallery component
- [data-table](../../verifiers/data-table.json) — Build a data table with sorting
