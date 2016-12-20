document.callbacks = [];

const DOMNodeCollection = require('./dom_node_collection.js');

Window.prototype.$d = function(arg) {
  let selected = [];
  let callbacks = [];

  if (arg instanceof HTMLElement) {
    selected = [arg];
  } else if (typeof arg === "string") {
    selected = Array.from(document.querySelectorAll(arg));
  } else if (typeof arg === "function") {
    document.callbacks.push(arg);
  }

  return new DOMNodeCollection(selected);
};

document.addEventListener("DOMContentLoaded", () => {
  document.callbacks.forEach(callback => {
    callback();
  });
});
