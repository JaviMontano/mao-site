/**
 * OfflinePill.js — Cache state indicator Web Component
 * Shows a subtle fixed pill reflecting offline/cache state.
 * Subscribes to bus.js 'cache-state' events.
 */
import { on, off } from '../js/state/bus.js';

const LABELS = {
  fresh:        { es: '', en: '' },
  stale:        { es: 'Datos almacenados', en: 'Cached data' },
  syncing:      { es: 'Sincronizando...', en: 'Syncing...' },
  fallback:     { es: 'Sin conexión', en: 'Offline' },
  pending_sync: { es: 'Guardado localmente', en: 'Saved locally' },
};

const COLORS = {
  stale: '#eab308', syncing: '#3b82f6', fallback: '#f97316', pending_sync: '#22c55e',
};

class OfflinePill extends HTMLElement {
  connectedCallback() {
    this._lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    this._hideTimer = null;
    this._handler = ({ state }) => this.setState(state);
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    Object.assign(this.style, {
      position: 'fixed', bottom: '1rem', right: '1rem', zIndex: '9999',
      padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem',
      fontFamily: 'system-ui, sans-serif', fontWeight: '600', color: '#fff',
      transition: 'opacity 0.3s, transform 0.3s',
      opacity: '0', pointerEvents: 'none', transform: 'translateY(0.5rem)',
    });
    on('cache-state', this._handler);
  }

  disconnectedCallback() {
    off('cache-state', this._handler);
    clearTimeout(this._hideTimer);
  }

  setState(state) {
    clearTimeout(this._hideTimer);
    if (state === 'fresh' || !LABELS[state]) {
      this.style.opacity = '0';
      this.style.pointerEvents = 'none';
      this.style.transform = 'translateY(0.5rem)';
      this.textContent = '';
      return;
    }
    this.textContent = LABELS[state][this._lang];
    this.style.background = COLORS[state];
    this.style.opacity = '1';
    this.style.pointerEvents = 'auto';
    this.style.transform = 'translateY(0)';
    this.style.animation = state === 'syncing' ? 'offline-pill-pulse 1.5s infinite' : 'none';

    if (state === 'stale' || state === 'pending_sync') {
      this._hideTimer = setTimeout(() => this.setState('fresh'), 5000);
    }
  }
}

/* Inject pulse keyframes once */
if (!document.getElementById('offline-pill-style')) {
  const s = document.createElement('style');
  s.id = 'offline-pill-style';
  s.textContent = `@keyframes offline-pill-pulse{0%,100%{opacity:1}50%{opacity:.5}}`;
  document.head.appendChild(s);
}

customElements.define('offline-pill', OfflinePill);
export default OfflinePill;
