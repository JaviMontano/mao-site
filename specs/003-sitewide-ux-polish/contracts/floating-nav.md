# Contract: Floating Nav Section Detection

## Inclusion Rules

A DOM element is included in the floating nav if ALL of:
1. It is a `<section>` with an `id`, OR a `<h2>`/`<h3>` with an `id`
2. It has a readable label (heading text or derived from ID)
3. Its `id` is not `main-content`
4. It does NOT have the `data-nav-exclude` attribute
5. It does NOT have the class `hook-quote-section`

## Exclusion Contract

Any element with `data-nav-exclude` attribute is excluded from floating nav detection regardless of tag type, ID, or content. This is the single, reusable mechanism for marking non-navigable sections site-wide.

## Maximum Items

The floating nav displays at most 8 section links (usability cap).
