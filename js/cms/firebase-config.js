/**
 * Firebase app initialization — public config only, no secrets.
 * @module js/cms/firebase-config
 */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBplaceholder-public-api-key',
  authDomain: 'site-metodologia.firebaseapp.com',
  projectId: 'site-metodologia',
  storageBucket: 'site-metodologia.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:placeholder',
};

let app = null;

export function getFirebaseApp() {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
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
