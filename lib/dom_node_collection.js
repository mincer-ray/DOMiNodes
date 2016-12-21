class DOMNodeCollection {

  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if(string !== undefined){
      this.elements.forEach(el => {
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
      this.elements.forEach(el => {
        el.attributes[attributeName].value = value;
      });
    }
  }

  addClass(name) {
    this.elements.forEach(el => {
      el.className = `${ el.className } ${ name }`;
    });
  }

  removeClass(name) {
    this.elements.forEach(el => {
      let classes = el.className.split(" ");
      let newClasses = [];
      classes.forEach(className => {
        if (className !== name){
          newClasses.push(className);
        }
      });

      el.className = newClasses.join(' ');
    });
  }

  append(newContent) {
    if (this.elements.length === 0) return;

    if (typeof newContent === 'string') {
      this.elements.forEach(el => {
        el.innerHTML = el.innerHTML + newContent;
      });
    } else if (typeof newContent === 'object') {
      if (!(newContent instanceof DOMNodeCollection)) newContent = $d(newContent);
      this.elements.forEach(el => {
        newContent.elements.forEach(content => {
          el.appendChild(content.cloneNode(true));
        });
      });
    }
  }

  children() {
    let childs = [];

    this.elements.forEach(el =>{
      childs = childs.concat(Array.from(el.children));
    });

    return new DOMNodeCollection(childs);
  }

  parent() {
    let parents = [];

    this.elements.forEach(el => {
      parents.push(el.parentNode);
    });

    return new DOMNodeCollection(parents);
  }

  find(selector){
    let results = [];

    this.elements.forEach(el => {
      results = results.concat(Array.from(el.querySelectorAll(selector)));
    });

    return new DOMNodeCollection(results);
  }

  remove() {
    this.elements.forEach(el => {
      el.parentNode.removeChild(el);
    });

    this.elements = [];
  }

  on(eventType, callback){
    this.elements.forEach(el => {
      el.addEventListener(eventType, callback);
      const events = `${eventType}-events`;
      if (el[events] === undefined) {
        el[events] = [];
      }

      el[events].push(callback);
    });
  }

  off(eventType) {
    this.elements.forEach(el => {
      const events = `${eventType}-events`;
      if (el[events]) {
        el[events].forEach(callback => {
          el.removeEventListener(eventType, callback);
        });
      }

      el[events] = [];
    });
  }
}

module.exports = DOMNodeCollection;
