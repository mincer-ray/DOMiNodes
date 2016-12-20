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

	document.addEventListener("DOMContentLoaded", () => {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(string) {
	    if(string !== undefined){
	      this.elements.forEach((e) => {
	        e.innerHTML = string;
	      });
	    }else {
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
	      this.elements.forEach((e) => {
	        e.attributes[attributeName].value = value;
	      });
	    }
	  }

	  addClass(cName) {
	    this.elements.forEach((el) => {
	      el.className = el.className + ` ${cName}`;
	    });
	  }

	  removeClass(cName) {
	    this.elements.forEach((el) => {
	      let classes = el.className.split(" ");
	      classes = classes.map((el) => {
	        if (el !== cName){
	          return el;
	        }
	      });
	      el.className = classes.join(' ');
	    });
	  }

	  append(content) {
	    this.elements.forEach((el) => {
	      el.innerHTML = el.innerHTML + content;
	    });
	  }

	  children() {
	    let childs = [];

	    this.elements.forEach((e) =>{
	      childs = childs.concat(Array.from(e.children));
	    });

	    return new DOMNodeCollection(childs);
	  }

	  parent() {
	    let parents = [];

	    this.elements.forEach((e) => {
	      parents.push(e.parentNode);
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