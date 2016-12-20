# DOMiNodes - JavaScript DOM Manipulation Library

DOMiNodes is a DOM manipulation library inspired by jQuery written entirely in JavaScript. It features

## Public API

### $d (selector)
##### Creates and returns a DOMiNodes Object

Selecting DOM Elements
```javascript
$d("div.class")
```
Wrapping HTML Elements
```javascript
const newDiv = document.createElement("div");
$d(newDiv)
```
Queue callbacks to run when DOM Content has finished loading
```javascript
$d(() => alert("content has loaded!"))
```
### DOMiNodes Methods

#### html(string)
Sets the inner HTML of all selected elements
```html
<p class="paragraph"></p>
```
```javascript
$d("p.paragraph").html("hello world")
```
```html
<p class="paragraph">hello world</p>
```

#### empty()

#### attr(attributeName, value)

#### addClass(className)

#### removeClass(className)

#### append(content)

#### children()

#### parent()

#### find(selector)

#### remove()

#### on(eventType, callback)

#### off(eventType)
