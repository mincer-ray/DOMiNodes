# DOMiNodes - JavaScript DOM Manipulation Library

DOMiNodes is a DOM manipulation library inspired by jQuery written entirely in JavaScript. It features

## Public API

### $d (selector)
##### Creates and returns a DOMiNodes Object

Selecting DOM Elements
```javascript
$d("div.class");
```
Wrapping HTML Elements
```javascript
const newDiv = document.createElement("div");
$d(newDiv)
```
Queue callbacks to run when DOM Content has finished loading
```javascript
$d(() => alert("content has loaded!"));
```
### DOMiNodes Methods

#### html(string)
Sets the inner HTML of all selected elements
```html
<p class="paragraph"></p>
```
:arrow_down:
```javascript
$d("p.paragraph").html("hello world");
```
:arrow_down:
```html
<p class="paragraph">hello world</p>
```
Returns the inner HTML of the first element in a collection
```html
<p class="paragraph">hello world</p>
```
:arrow_down:
```javascript
$d("p.paragraph").html("hello world");
//-> "hello world"
```
#### empty()
Deletes all child elements of the collection elements
```html
<ul class="emptyMe">
  <li>Hello</li>
  <li>World</li>
</ul>
```
:arrow_down:
```javascript
$d("ul.emptyMe").empty();
```
:arrow_down:
```html
<ul class="emptyMe">
</ul>
```

#### attr(attributeName, value)
Gets value of attribute for first Element in colllection OR sets value for attribute of all elements in collection
```html
<img src="" alt="hello">
<img src="" alt="">
<img src="" alt="">
```
:arrow_down:
```javascript
$d("img").attr("alt");
//-> "hello"
$d("img").attr("alt", "goodbye");
```
:arrow_down:
```html
<img src="" alt="goodbye">
<img src="" alt="goodbye">
<img src="" alt="goodbye">
```
#### addClass(className)

#### removeClass(className)

#### append(content)

#### children()

#### parent()

#### find(selector)

#### remove()

#### on(eventType, callback)

#### off(eventType)
