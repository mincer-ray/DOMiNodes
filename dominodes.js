/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	document.callbacks = [];

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(string) {
	    if(string !== undefined){
	      this.elements.forEach((el) => {
	        el.innerHTML = string;
	      });
	    } else if (this.elements.length > 0) {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  attr(attributeName, value) {
	    if (this.elements.length === 0) return null;

	    if (value === undefined) {
	      return this.elements[0].attributes[attributeName].value;
	    } else {
	      this.elements.forEach((el) => {
	        el.attributes[attributeName].value = value;
	      });
	    }
	  }

	  addClass(cName) {
	    this.elements.forEach((el) => {
	      el.className = `${ el.className } ${ cName }`;
	    });
	  }

	  removeClass(cName) {
	    this.elements.forEach((el) => {
	      let classes = el.className.split(" ");
	      let newClasses = [];
	      classes.forEach((el) => {
	        if (el !== cName){
	          newClasses.push(el);
	        }
	      });

	      el.className = newClasses.join(' ');
	    });
	  }

	  append(content) {
	    if (this.elements.length === 0) return;

	    if (typeof content === 'string') {
	      this.elements.forEach((el) => {
	        el.innerHTML = el.innerHTML + content;
	      });
	    } else if (typeof content === 'object') {
	      if (!(content instanceof DOMNodeCollection)) content = $d(content);
	      this.elements.forEach((el) => {
	        content.elements.forEach((c) => {
	          el.appendChild(c.cloneNode(true));
	        });
	      });
	    }
	  }

	  children() {
	    let childs = [];

	    this.elements.forEach((el) =>{
	      childs = childs.concat(Array.from(el.children));
	    });

	    return new DOMNodeCollection(childs);
	  }

	  parent() {
	    let parents = [];

	    this.elements.forEach((el) => {
	      parents.push(el.parentNode);
	    });

	    return new DOMNodeCollection(parents);
	  }

	  find(selector){
	    let results = [];
	    this.elements.forEach((el) => {
	      results = results.concat(Array.from(el.querySelectorAll(selector)));
	    });
	    return new DOMNodeCollection(results);
	  }

	  remove() {
	    this.elements.forEach((el) => {
	      el.parentNode.removeChild(el);
	    });

	    this.elements = [];
	  }

	  on(lEvent, callback){
	    this.elements.forEach((el) => {
	      el.addEventListener(lEvent, callback);
	      const events = `${lEvent}-events`;
	      if (el[events] === undefined) {
	        el[events] = [];
	      }

	      el[events].push(callback);
	    });
	  }

	  off(lEvent) {
	    this.elements.forEach((el) => {
	      const events = `${lEvent}-events`;
	      if (el[events]) {
	        el[events].forEach((callback) => {
	          el.removeEventListener(lEvent, callback);
	        });
	      }

	      el[events] = [];
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);