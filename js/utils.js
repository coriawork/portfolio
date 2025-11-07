export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const log = (...args) => console.log(...args);

export const createElement = (tag, className = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
};

export const removeElement = (element) => {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
