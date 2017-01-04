[live]: https://www.peterdegenaro.com/DOMiNodes/

![logo](https://raw.githubusercontent.com/mincer-ray/DOMiNodes/master/logo.png)

DOMiNodes is a DOM manipulation library written entirely in JavaScript. It enables users to traverse the DOM, selecting and modifying node elements on the fly. Take a look below for the DOMiNodes API features.

[Towers of Hanoi Live Demo][live]

| [Public API](#public-api) | [Todos](#todos) |

# Public API
- [selector()](#d-selector)
- [html()](#htmlstring)
- [empty()](#empty)
- [attr()](#attrattributename-value)
- [addClass()](#addclassclassname)
- [removeClass()](#removeclassclassname)
- [append()](#appendcontent)
- [children()](#children)
- [parent()](#parent)
- [find()](#findselector)
- [remove()](#remove)
- [on()](#oneventtype-callback)
- [off()](#offeventtype)
- [ajax()](#ajaxoptions)

## $d (selector)
### Creates and returns a DOMiNodes Object

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
## DOMiNodes Methods

### html(string)
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
### empty()
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

### attr(attributeName, value)
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
### addClass(className)
Adds a class name to every element in the collection
```html
<div class="hello"></div>
<div class="hello"></div>
```
:arrow_down:
```javascript
$d("div.hello").addClass("world");
```
:arrow_down:
```html
<div class="hello world"></div>
<div class="hello world"></div>
```
### removeClass(className)
Removes a class name from every element in the collection
```html
<div class="hello world"></div>
<div class="hello world"></div>
```
:arrow_down:
```javascript
$d("div.hello").removeClass("hello");
```
:arrow_down:
```html
<div class="world"></div>
<div class="world"></div>
```
### append(content)
Appends content to every element of the collection in accordance to type of input content given
```html
<p></p>
<p></p>
<p></p>
```
:arrow_down:
```javascript
$d("p").append("hello");
```
:arrow_down:
```html
<p>hello</p>
<p>hello</p>
<p>hello</p>
```
:arrow_down:
```javascript
$d("p").append(document.createElement("div"));
```
:arrow_down:
```html
<p>hello<div></div></p>
<p>hello<div></div></p>
<p>hello<div></div></p>
```
### children()
Returns a new collection containing the child elements of the elements in the original collection.
```html
<ul>
  <li></li>
  <li></li>
</ul>
```
:arrow_down:
```javascript
$d("ul").children();
//<li></li>
//<li></li>
```
### parent()
```html
<div>
  <p></p>
</div>
```
:arrow_down:
```javascript
$d("p").parent();
//<div></div>
```
### find(selector)
Searches all elements in the collection for children that match the input selector.
```html
<div>
  <p class="hello"></p>
  <section></section>
  <aside class="side"></aside>
</div>
```
:arrow_down:
```javascript
$d("div").find("aside.side");
//<aside class="side"></aside>
```
### remove()
Removes all elements of the collection from the DOM and empties the collection.
```html
<div>
  <p></p>
  <section></section>
</div>
```
:arrow_down:
```javascript
$d("div").remove();
```
:arrow_down:
```html
```
### on(eventType, callback)
Adds an event listener with the given type and callback to all elements of the collection
```javascript
$d("button.hello").on("click", () => alert("hello"));
```
### off(eventType)
Removes the event listeners for a given type from all elements of the collection
```javascript
$d("button.hello").off("click");
```
### ajax({options})
Used to make an ajax request to an external source. Example:
```javascript
$d.ajax({
  url: "http://www.coolapi.com/posts",
  method: "GET",
  success: () => alert("success!"),
  error: () => alert("oh no!"),
  data: { code: 1234 }
})
```

# Todos
- Improve live demo by adding more feature to demonstrate DOMiNodes
