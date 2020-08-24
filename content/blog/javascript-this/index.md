---
title: What the f**k is "this"?
date: "2020-08-15"
description: "How 'this' works in javascript."
---

## _'this'_ by definition

1. **'this'** basically refers to an object which is drawn through the consideration of different contexts at which the function is being called.

2. Best way to understand **'this'** is by knowing _how_, _when_ and _where_ the function is being **_called_**(rather than _how_, _when_ and _where_ it is **_defined_**).

## _'this'_ w.r.t different contexts

    Before we proceed, I would like to state two statements:
    1. Conceptually, everything in javascript is considerd as object.
    2. Technically, Object itself is a different entity to work on.

    > To understand why? you can google 'prototypal inheritance in javascript'
    > For now, just take it as a statement.

### 1.'this' as Global Object

```javascript
console.log(this === window) // output: true
// this refers to the global object i.e window object(in case of browser environment)

// let's define a function and see how 'this' works with it
function whatIsThis() {
  console.log(this === window)
}

whatIsThis() // output: true
// again it returns true, that means, in a functional scope also 'this' refers to the global object(window)

// let's define a global variable and a local variable and re-write the above function

var thisIs = "global"

function whatIsThis() {
  var thisIs = "local"
  console.log(this.thisIs)
}

whatIsThis() // output: global
```

> Conclusion: 'this' inside a functional scope always refers to the global object.

> Note: In a functional scope 'this' only works when not in strict mode.

```javascript
var thisIs = "global"

function whatIsThis() {
  "use strict"
  console.log(this.thisIs)
}

whatIsThis() // output: Error: Cannot read property 'thisIs' of undefined
```

### 2.'this' inside an Object

```javascript
var thisIs = "global"
let thisObject = {
  thisIs: "local",
  whatIsThis: function () {
    console.log(this.thisIs)
  },
}

thisObject.whatIsThis() // output: local

// let's print the value of 'this' only

let thisObject = {
  thisIs: "local",
  whatIsThis: function () {
    console.log(this)
  },
}

thisObject.whatIsThis() // output: {thisIs: "local", whatIsThis: ƒ}
// output is showing all the properties of the object 'thisObject'
```

> Conclusion: 'this' refers to the properties(property of an object can be a method or simply a value) of the object, when it is used inside the method of the respective object.

### 3.'this' inside a constructor

```javascript
// 'new' is to create instance of an object

class programmingLanguage {
   constructor(language) {
       this.language = language
   }

    displayName () {
        console.log(`I'm ${this.language}`)
    }
}
let js = new programmingLanguage('javascript')

js.displayName() // output: I'm javascript

//using function as constructor

// functions become constructors if you invoke them using 'new' operator
function programmingLanguage(language){
  this.language = language

  this.displayName = function() {
    console.log(`I'm ${this.language}`)
  }
let js = new programmingLanguage('javascript')

js.displayName() // output: I'm javascript

```

> Conclusion: Using _'new'_, operator creates an instance of object and passes it to the constructor through 'this'.

### 4.'this' with _call_, _apply_ and _bind_ method

    Every function in javascript has some method attached to it. Call, apply, and bind are also such methods.
    These methods can be used to set a custom value to 'this' in the execution context of the function.

```javascript
//call

function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName

  this.displayName = function () {
    console.log(`Name: ${this.firstName} ${this.lastName}`)
  }
}

function Person1(fname, lname) {
  // using call to access the method of Person to Person1
  Person.call(this, fname, lname)
  //'this' refers to the properties of Person.
}

let P1 = new Person1("Harry", "Potter")

P1.displayName() // output: Name: Harry Potter
```

> Note: Both call and apply works similarly, the only difference is in the way they accept argument.

```javascript
//apply

function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName

  this.displayName = function () {
    console.log(`Name: ${this.firstName} ${this.lastName}`)
  }
}

function Person2(fname, lname) {
  // using apply to access the method of Person to Person2
  Person.apply(this, [fname, lname])
  //'this' refers to the properties of Person.
}

let P2 = new Person2("Ron", "Weasley")

P2.displayName() // output: Name: Ron Weasley
```

> Note: The bind method creates a new bound function, which is an exotic function object that wraps the original function object. Calling the bound function generally results in the execution of its wrapped function.

```javascript
//bind

function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName

  this.displayName = function () {
    console.log(`Name: ${this.firstName} ${this.lastName}`)
  }
}

function Person3(fname, lname) {
  // using bind to access the method of Person to Person3
  let person = Person.bind(this, fname, lname)
  //'this' refers to the properties of Person.
  // bind method creates a new method i.e person
  person()
}

let P3 = new Person3("Hermione", "Granger")

P3.displayName() // output: Name: Hermione Granger
```

> Conclusion: When a function is called using the call, apply and bind methods then this refers to the value passed as the first argument.

>>> PS. (In technology it's never enough in terms of learning, adding to that javascript is considerd as stupid language. So, feel free to correct me.)