/**
 * MetodologIA — Unified Modal System
 * Consolidates all modal patterns across the site into one accessible, reusable system.
 *
 * Patterns auto-detected:
 *   B: opacity-0 / pointer-events-none toggle (cotizador, levels_grid)
 *   A: .active class toggle on .modal-overlay (nosotros, empresas)
 *   D: hidden class toggle
 *   Fallback: display none/flex
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

const ModalSystem = (() => {
    'use strict';

    // --- State ---
    const stack = [];          // ordered list of open modal IDs
    const meta  = new Map();   // id → { pattern, previousFocus, scrollY }

    const FOCUSABLE = [
        'a[href]', 'button:not([disabled])', 'input:not([disabled])',
        'select:not([disabled])', 'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])', '[contenteditable]'
    ].join(',');

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Pattern detection ---
    function detectPattern(el) {
        if (el.classList.contains('opacity-0'))        return 'B';
        if (el.classList.contains('hidden'))            return 'D';
        if (el.classList.contains('modal-overlay'))     return 'A';
        if (el.classList.contains('modal'))             return 'A'; // empresas bootcamp
        return 'fallback';
    }

    // --- Show / Hide per pattern ---
    function showByPattern(el, pattern) {
        switch (pattern) {
            case 'B':
                el.classList.remove('opacity-0', 'pointer-events-none');
                el.classList.add('opacity-100');
                break;
            case 'D':
                el.classList.remove('hidden');
                break;
            case 'A':
                el.classList.add('active');
                break;
            default:
                el.style.display = 'flex';
        }
    }

    function hideByPattern(el, pattern) {
        switch (pattern) {
            case 'B':
                el.classList.add('opacity-0', 'pointer-events-none');
                el.classList.remove('opacity-100');
                break;
            case 'D':
                el.classList.add('hidden');
                break;
            case 'A':
                el.classList.remove('active');
                break;
            default:
                el.style.display = 'none';
        }
    }

    // --- Focus Trap ---
    function getFocusable(container) {
        return [...container.querySelectorAll(FOCUSABLE)].filter(
            el => el.offsetParent !== null
        );
    }

    function trapFocus(e) {
        if (stack.length === 0) return;
        const topId = stack[stack.length - 1];
        const el = document.getElementById(topId);
        if (!el) return;

        const focusable = getFocusable(el);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last  = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    // --- Scroll Lock ---
    function lockScroll() {
        document.body.style.overflow = 'hidden';
    }

    function unlockScroll() {
        if (stack.length === 0) {
            document.body.style.overflow = '';
        }
    }

    // --- ARIA ---
    function setAriaOpen(el) {
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        const main = document.querySelector('main');
        if (main) main.setAttribute('aria-hidden', 'true');
    }

    function clearAria(el) {
        el.removeAttribute('aria-modal');
        if (stack.length === 0) {
            const main = document.querySelector('main');
            if (main) main.removeAttribute('aria-hidden');
        }
    }

    // --- z-index ---
    function applyZIndex(el) {
        const zModal = getComputedStyle(document.documentElement)
            .getPropertyValue('--z-modal').trim();
        el.style.zIndex = zModal || '9999';
    }

    function clearZIndex(el) {
        el.style.zIndex = '';
    }

    // --- Overlay click ---
    function onOverlayClick(e) {
        // Only close if the click target is the overlay itself, not content
        if (e.target === e.currentTarget) {
            const id = e.currentTarget.id;
            if (id) close(id);
        }
    }

    // --- ESC handler (single global) ---
    function onKeyDown(e) {
        if (e.key === 'Escape' && stack.length > 0) {
            e.preventDefault();
            close(stack[stack.length - 1]);
        }
        if (e.key === 'Tab' && stack.length > 0) {
            trapFocus(e);
        }
    }

    // --- Public API ---

    /**
     * Open a modal by its DOM id.
     * @param {string} id - The id attribute of the modal element.
     * @param {Object} [options]
     * @param {Function} [options.onOpen] - Callback after open.
     */
    function open(id, options = {}) {
        const el = document.getElementById(id);
        if (!el) {
            console.warn(`[ModalSystem] Element #${id} not found`);
            return;
        }

        // Already open?
        if (stack.includes(id)) return;

        const pattern = detectPattern(el);

        // Save state
        meta.set(id, {
            pattern,
            previousFocus: document.activeElement
        });

        // Apply z-index
        applyZIndex(el);

        // ARIA
        setAriaOpen(el);

        // Show
        showByPattern(el, pattern);

        // Scroll lock
        lockScroll();

        // Push to stack
        stack.push(id);

        // Overlay click binding (idempotent via data attribute)
        if (!el.dataset.modalBound) {
            el.addEventListener('click', onOverlayClick);
            el.dataset.modalBound = 'true';
        }

        // Focus first focusable element after transition
        const delay = prefersReducedMotion() ? 0 : 50;
        setTimeout(() => {
            const focusable = getFocusable(el);
            if (focusable.length > 0) {
                focusable[0].focus();
            }
        }, delay);

        if (typeof options.onOpen === 'function') options.onOpen(el);
    }

    /**
     * Close a modal by id, or the topmost if no id given.
     * @param {string} [id]
     * @param {Object} [options]
     * @param {Function} [options.onClose] - Callback after close.
     */
    function close(id, options = {}) {
        if (!id && stack.length > 0) {
            id = stack[stack.length - 1];
        }
        if (!id) return;

        const el = document.getElementById(id);
        const info = meta.get(id);
        if (!el || !info) return;

        // Hide
        hideByPattern(el, info.pattern);

        // Clear ARIA
        clearAria(el);

        // Clear z-index after transition
        const delay = prefersReducedMotion() ? 0 : 300;
        setTimeout(() => clearZIndex(el), delay);

        // Remove from stack
        const idx = stack.indexOf(id);
        if (idx !== -1) stack.splice(idx, 1);

        // Unlock scroll
        unlockScroll();

        // Restore focus
        if (info.previousFocus && typeof info.previousFocus.focus === 'function') {
            info.previousFocus.focus();
        }

        // Cleanup
        meta.delete(id);

        if (typeof options.onClose === 'function') options.onClose(el);
    }

    /**
     * Close all open modals.
     */
    function closeAll() {
        // Close from top to bottom
        while (stack.length > 0) {
            close(stack[stack.length - 1]);
        }
    }

    /**
     * Check if a modal is currently open.
     * @param {string} id
     * @returns {boolean}
     */
    function isOpen(id) {
        return stack.includes(id);
    }

    /**
     * Create and open a premium resource email gate modal.
     * Collects email, creates a lead with fuente 'home-resource-premium',
     * then invokes a callback with the email on success.
     *
     * @param {Object} options
     * @param {string} options.resourceId - Identifier for the premium resource.
     * @param {string} options.resourceTitle - Display title shown in the modal.
     * @param {Function} [options.onUnlock] - Callback(email) after successful submission.
     * @param {Function} [options.onError] - Callback(error) on submission failure.
     */
    function openPremiumGate(options = {}) {
        const { resourceId = '', resourceTitle = 'Recurso Premium', onUnlock, onError } = options;

        const MODAL_ID = 'premium-gate-modal';

        // Remove previous instance if any
        const prev = document.getElementById(MODAL_ID);
        if (prev) prev.remove();

        // Build modal DOM
        const overlay = document.createElement('div');
        overlay.id = MODAL_ID;
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
          <div class="premium-gate" role="document">
            <button class="premium-gate__close" aria-label="Cerrar" type="button">&times;</button>
            <h2 class="premium-gate__title">${resourceTitle}</h2>
            <p class="premium-gate__desc">Ingresa tu correo para desbloquear este recurso premium.</p>
            <form class="premium-gate__form" novalidate>
              <label for="premium-gate-email" class="premium-gate__label">Correo electronico</label>
              <input id="premium-gate-email" type="email" class="premium-gate__input"
                     placeholder="tu@correo.com" required autocomplete="email">
              <p class="premium-gate__error" role="alert" hidden>Ingresa un correo valido.</p>
              <button type="submit" class="premium-gate__submit">Desbloquear recurso</button>
            </form>
            <p class="premium-gate__privacy">No compartimos tu correo. Sin spam.</p>
          </div>
        `;
        document.body.appendChild(overlay);

        // Wire close button
        overlay.querySelector('.premium-gate__close').addEventListener('click', () => {
            close(MODAL_ID);
        });

        // Wire form submission
        const form = overlay.querySelector('.premium-gate__form');
        const emailInput = overlay.querySelector('#premium-gate-email');
        const errorMsg = overlay.querySelector('.premium-gate__error');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            // Basic email validation
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorMsg.hidden = false;
                emailInput.focus();
                return;
            }
            errorMsg.hidden = true;

            try {
                // Create lead in Firestore if available
                if (window.firebase && window.firebase.firestore) {
                    const db = window.firebase.firestore();
                    await db.collection('leads').add({
                        email,
                        fuente: 'home-resource-premium',
                        recurso: resourceId,
                        created_at: new Date().toISOString(),
                        audiencia: document.documentElement.dataset.audience || 'persona',
                    });
                }

                close(MODAL_ID);
                if (typeof onUnlock === 'function') onUnlock(email);
            } catch (err) {
                console.error('[ModalSystem] Premium gate error:', err);
                if (typeof onError === 'function') onError(err);
            }
        });

        // Open via standard ModalSystem flow
        open(MODAL_ID);
    }

    // --- Init: single global keydown listener ---
    document.addEventListener('keydown', onKeyDown);

    return { open, close, closeAll, isOpen, openPremiumGate };
})();

// Expose globally
window.ModalSystem = ModalSystem;
