document.addEventListener("DOMContentLoaded", () => {

const DOMNodeCollection = require('./dom_node_collection.js');

  Window.prototype.$d = function(arg) {
    let selected = [];

    if (arg instanceof HTMLElement){
      selected = [arg];
    } else if (typeof arg === "string"){
      selected = Array.from(document.querySelectorAll(arg));
    }

    return new DOMNodeCollection(selected);
  };
});
