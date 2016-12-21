const DOMNodeCollection = require('./dom_node_collection.js');

document.callbacks = [];

window.$d = (arg) => {
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

$d.extend = (base, ...objects) => {
  objects.forEach(object => {
    Object.keys(object).forEach((key) => {
      base[key] = object[key];
    });
  });

  return base;
};

$d.ajax = (options) => {
  let request = new XMLHttpRequest();

  let defaults = {
    contentType: 'application/x-www-form-urlencoded: charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };

  options = $d.extend(defaults, options);

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

document.addEventListener("DOMContentLoaded", () => {
  document.callbacks.forEach(callback => {
    callback();
  });
});
