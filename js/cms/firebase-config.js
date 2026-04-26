/**
 * Firebase app initialization — public config only, no secrets.
 * Initializes Analytics when consent is granted.
 * @module js/cms/firebase-config
 */
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserProperties, setAnalyticsCollectionEnabled } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD_FBEKV3eBnQgMS3Hbz9k9POcy8bl3yws',
  authDomain: 'metodologia-pristino-10x.firebaseapp.com',
  projectId: 'metodologia-pristino-10x',
  storageBucket: 'metodologia-pristino-10x.firebasestorage.app',
  messagingSenderId: '73613281871',
  appId: '1:73613281871:web:ec87a5fc9cd67bb87a783a',
  measurementId: 'G-M70XT7Q963',
};

let app = null;
let analytics = null;

export function getFirebaseApp() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    _initAnalytics();
  }
  return app;
}

/**
 * Initialize Analytics — disabled by default, enabled on consent.
 */
function _initAnalytics() {
  try {
    analytics = getAnalytics(app);
    // Start disabled — only collect when consent is granted
    setAnalyticsCollectionEnabled(analytics, false);

    // Check if consent already exists
    const cookie = document.cookie.split('; ').find(r => r.startsWith('mdg_consent='));
    if (cookie) {
      try {
        const val = JSON.parse(decodeURIComponent(cookie.split('=').slice(1).join('=')));
        if (val.analytics === true) {
          setAnalyticsCollectionEnabled(analytics, true);
        }
      } catch { /* ignore parse errors */ }
    }

    // Listen for future consent changes
    window.addEventListener('mdg:consent-changed', (e) => {
      if (analytics) {
        setAnalyticsCollectionEnabled(analytics, e.detail?.analytics === true);
      }
    });

    // Expose for events.js
    window.firebaseAnalytics = { logEvent: (name, params) => logEvent(analytics, name, params), setUserProperties: (props) => setUserProperties(analytics, props) };
  } catch { /* Analytics unavailable (blocked, emulator, etc.) */ }
}

/**
 * Override config for emulator/testing.
 * @param {Object} config - Firebase config override
 * @returns {FirebaseApp}
 */
export function initFirebaseApp(config) {
  app = initializeApp(config || firebaseConfig);
  return app;
}
