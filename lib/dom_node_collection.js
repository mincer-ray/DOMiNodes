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
