import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'tests/unit/**/*.test.js',
      'tests/unit/**/*.spec.js',
      'tests/integration/**/*.test.js',
      'tests/integration/**/*.spec.js',
    ],
    coverage: {
      provider: 'v8',
      thresholds: {
        // Global: NFR-008 baseline
        lines: 85,
        branches: 80,

        // Pure modules — 100% coverage required
        'js/state/bus.js': {
          lines: 100,
          branches: 100,
          functions: 100,
          statements: 100,
        },
        'js/diagnostic/logic.js': {
          lines: 100,
          branches: 100,
          functions: 100,
          statements: 100,
        },

        // Logic modules — ≥95% lines
        'js/audience/state.js': {
          lines: 95,
        },
        'js/analytics/events.js': {
          lines: 95,
        },
        'js/theme/toggle.js': {
          lines: 95,
        },

        // Controllers — ≥80% lines
        'js/diagnostic/controller.js': {
          lines: 80,
        },
        'js/audience/controller.js': {
          lines: 80,
        },

        // Web Components — ≥70% lines
        'components/*.js': {
          lines: 70,
        },
      },
    },
  },
});
