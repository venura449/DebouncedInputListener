// Debounce utility
export function debounce(fn, delay = 500, immediate = false) {
    let timeout;
    return function (...args) {
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    };
}

/**
 * Attach debounced input listener(s) to input(s).
 *
 * @param {string} selector - CSS selector
 * @param {function} callback - Called after debounce
 * @param {object} options - {
 *   delay, eventType, minChars, trim, preventDuplicates, immediate
 * }
 * @returns {function} cleanup - Call this to remove listeners
 */
export function attachDebouncedInputListener(selector, callback, options = {}) {
    const {
        delay = 500,
        eventType = 'input',
        minChars = 0,
        trim = false,
        preventDuplicates = false,
        immediate = false,
    } = options;

    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found for selector: ${selector}`);
        return () => {};
    }

    let lastValue = null;

    const wrappedCallback = (event) => {
        let value = event.target.value;
        if (trim) value = value.trim();
        if (value.length < minChars) return;
        if (preventDuplicates && value === lastValue) return;
        lastValue = value;
        callback(value, event);
    };

    const debounced = debounce(wrappedCallback, delay, immediate);
    const attached = [];

    elements.forEach(el => {
        el.addEventListener(eventType, debounced);
        attached.push({ el, handler: debounced });
    });

    return function cleanup() {
        attached.forEach(({ el, handler }) => {
            el.removeEventListener(eventType, handler);
        });
    };
}

// 🔍 Live Search Helper
export function attachDebouncedLiveSearch(selector, searchFn, options = {}) {
    return attachDebouncedInputListener(selector, (value, event) => {
        searchFn(value, event);
    }, {
        ...options,
        minChars: options.minChars ?? 2,
        trim: true,
        preventDuplicates: true
    });
}

// ✅ Validation Helper
export function attachDebouncedValidation(selector, validateFn, options = {}) {
    return attachDebouncedInputListener(selector, (value, event) => {
        const isValid = validateFn(value);
        const el = event.target;
        el.setCustomValidity(isValid ? '' : 'Invalid input');
        el.reportValidity?.();
    }, {
        ...options,
        trim: true
    });
}

// 💾 Auto-Save Input Helper
export function attachAutoSaveInput(selector, saveFn, options = {}) {
    return attachDebouncedInputListener(selector, (value, event) => {
        saveFn(value, event);
    }, {
        ...options,
        trim: true,
        preventDuplicates: true
    });
}

// 📏 Pattern Validator
export function validatePattern(pattern, value) {
    if (!pattern || typeof value !== 'string') return false;
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return regex.test(value);
}

// 📧 Email Validator
export function isValidEmail(value) {
    return validatePattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, value);
}

// 📞 Phone Validator
export function isValidPhone(value) {
    return validatePattern(/^\+?[\d\s\-().]{7,}$/, value);
}
