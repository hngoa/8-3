/* utils.js – Shared utilities */

const Utils = (() => {
  /** Random float in [min, max] */
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  /** Random integer in [min, max] */
  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  /** Pick random element from array */
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Clamp value between min and max */
  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  /** Lerp */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /** Create element with classes */
  function el(tag, classes = '', text = '') {
    const e = document.createElement(tag);
    if (classes) e.className = classes;
    if (text) e.textContent = text;
    return e;
  }

  /** Delay (Promise) */
  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  return { rand, randInt, pick, clamp, lerp, el, delay };
})();
