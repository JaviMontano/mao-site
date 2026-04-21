# Analytics Events Contract — 009

Typed schema for FR-070..FR-072. Emitted only after `mdg_consent.analytics == true`. Silently dropped otherwise.

## Global payload envelope

Every event ships these fields on top of its own payload:

```ts
interface BaseEventEnvelope {
  locale: 'es' | 'en';
  deviceClass: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  source: 'organic' | 'utm' | 'direct' | 'referral';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  variant?: string;          // A/B test id, if assigned
  sessionId: string;         // anonymous uuid per tab
  timestamp: number;         // Date.now()
}
```

## Event catalog

| name | when | extra payload |
|---|---|---|
| `home_view` | first paint of the home (post-consent) | `{ returning: boolean }` |
| `cta_click_primary` | click on hero primary CTA | `{ cta_label: string }` |
| `cta_click_secondary` | click on hero secondary CTA | `{ cta_label: string }` |
| `cta_click_tertiary` | click on tertiary CTA (programas section) | `{ cta_label: string, program_slug?: string }` |
| `diagnostic_start` | step 1 rendered for the first time | `{ resume: boolean }` |
| `diagnostic_step_1` … `diagnostic_step_6` | step rendered | `{ step_id: string, question_id: string }` |
| `diagnostic_completed` | step 6 submitted + doc persisted | `{ nivel_id: string, score: number }` |
| `diagnostic_abandoned` | session expired OR user navigates away mid-flow | `{ last_step: number, time_spent_ms: number }` |
| `resource_open` | click on a resource card | `{ resource_id: string, tier: 'free'\|'premium' }` |
| `resource_premium_unlock` | email modal submitted on a premium resource | `{ resource_id: string }` |
| `program_request` | click on a program card CTA | `{ program_slug: string, audiencia: 'empresa'\|'persona' }` |

## Consent gating

```ts
function track(name: string, payload: object) {
  if (!getCookie('mdg_consent')?.analytics) return;  // silent drop
  firebaseAnalytics.logEvent(name, { ...envelope(), ...payload });
}
```

## PII rules

- **Never** include raw email, name, or phone in any event payload.
- `diagnostic_completed` MUST NOT include the user's email; only `nivel_id` and `score`.
- `resource_premium_unlock` MUST NOT include email; only `resource_id`.
- If a field could leak PII, hash it SHA-256 client-side first.

## Test coverage (→ `tests/unit/analytics-events.spec.js`)

- Drops silently when consent cookie absent or `analytics: false`.
- Attaches envelope fields on every emission.
- Never emits a payload containing `email`, `name`, `phone`.
- `diagnostic_step_N` is emitted exactly once per step per session.
