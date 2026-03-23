/**
 * Firebase app initialization — public config only, no secrets.
 * @module js/cms/firebase-config
 */
import { initializeApp } from 'firebase/app';

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
