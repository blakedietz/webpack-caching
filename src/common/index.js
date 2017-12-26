import data from '../version.json';

/**
 * Loads a source file into the DOM.
 * @param src
 * @returns {Promise<any>}
 */
const loadScript = (src)=>  {
    return new Promise((resolve, reject) => {
      let s;
      s = document.createElement('script');
      s.src = `${src}?v=${Date.now()}`;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

export default () => {
  return data;
};

export {
  loadScript,
}