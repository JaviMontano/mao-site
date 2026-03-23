/**
 * CMS initialization — exposes ContentService on window for non-module scripts (i18n.js).
 * Include as <script type="module"> on pages that use the CMS.
 */
import { getFirebaseApp } from './firebase-config.js';
import { ContentService } from './content-service.js';

async function initCms() {
  try {
    const app = getFirebaseApp();
    await ContentService.init({ app });
    window.ContentService = ContentService;
  } catch {
    // Firebase unavailable — i18n.js will use static JSON fallback
  }
}

initCms();
