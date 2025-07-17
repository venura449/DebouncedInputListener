// Debounce utility
export function debounce(fn, delay = 500) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Attach debounced input listener(s) to input(s).
 *
 * @param {string} selector - CSS selector (can match multiple inputs)
 * @param {function} callback - Function to call after delay
 * @param {object} options - Optional settings { delay: number, eventType: string }
 * @returns {function} cleanup - Call this to remove the event listeners
 */
export function attachDebouncedInputListener(selector, callback, options = {}) {
    const {
        delay = 500,
        eventType = 'input'
    } = options;

    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found for selector: ${selector}`);
        return () => {}; // return empty cleanup
    }

    const debounced = debounce(callback, delay);

    // Track listeners for cleanup
    const attached = [];

    elements.forEach(el => {
        el.addEventListener(eventType, debounced);
        attached.push({ el, handler: debounced });
    });

    // Return cleanup function
    return function cleanup() {
        attached.forEach(({ el, handler }) => {
            el.removeEventListener(eventType, handler);
        });
    };
}
