---
title: Arrow function = () => What + Why?
date: "2020-08-07"
description: "Just trying to articulate my understanding of arrow function."

---

## What exactly is arrow function?

1. It is syntactical compact alternative to a regular function in javaScript. It was introduced in ES6.

2. Arrow function does not have their own binding or context, rather they inherit the context from their parent scope. 




***These definitions might be sounding absurd at first go. So, lets understand it with some code.***

```javascript

//regular function declarations in javascript

function adder1(a,b) {
    return a + b
}

console.log(adder1(3,5)) // output 8

// or

var adder2 = function(a,b) {
    return a + b
}

console.log(adder2(4,6)) // output 10

console.log(adder2(0.1,0.2)) // can you guess the output?? No not 0.3

```


```javascript
// syntax of arrow function

const adder = (a,b) => {
    return a + b
}

console.log(adder(1,1)) //output 2

//we can further modify it like

const adder = (a,b) => a + b  //output would be same

```
***Isn't it super cool to use, as it reduces the code into one liner.***

    By now, you can relate to the first point of the definition.
    
    Now, let's move to to second point of the definition.
    
**I'm hoping you have some idea of concepts like *context, scope* and *this* of javascript.**

```javascript
// taking an example of an object having a method(adder) attached to it.

let sum = {
    a: 5,
    b: 5,
    adder: function() {
        return this.a + this.b
    }
}
console.log(sum.adder()) //output 10
```
> Breaking and understanding above code
 - Object sum having two variables(a, b) and one method (adder) attached to it.
 - Adder method returns the sum of **a** and **b**.
 - Instead of writing **return a + b** we wrote **return this.a + this.b**.
 - Reason: here **this** is referencing to the properties, which are in the scope of it's parent i.e inside the scope of **Object sum**.


```javascript
//same object using arrow function.

let sum = {
    a: 5,
    b: 5,
    adder: () => {
        return this.a + this.b
    }
}

console.log(sum.adder()) // undefined

```

> Breaking and understanding above code
 - Arrow function doesn't have its own scope, by default it has the access to properties of its parent scope.
 - So, here **this** is referencing to the **window** object, **a** and  **b** are not defined in the scope of window. That's why output is undefined.

### Let's see how to operate arrow function in Class.

> Arrow functions in class field properties seem useful because they’re autobind, in short, no need to add ***this.method = this.method.bind(this)***  in the constructor.

```javascript
// virtue of regular vs arrow function in a class

class Language {
    constructor() {
        this.name = 'Javascript'
    }

    regularFunction() {
        console.log(`I'm the regular function of ${this.name}`)
    }

    arrowFunction() {
        console.log(`I'm the arrow function of ${this.name}`)
    }
}

let js = new Language()

js.regularFunction()  //output: I'm the regular function of Javascript
js.arrowFunction()  //output: I'm the arrow function of Javascript


```

>> Does that means there is no difference between them? Let's just see further.

```javascript
//defining a class Javascript inherited with the property of class Language

class Javascript extends Language {
    constructor() {
        this.name = "Javascript class"

        // using regularFunction method of class Language
        super.regularFunction

    }
}

let newJs = new Javascript()

newJs.regularFunction() //output: I'm the regular function of Javascript class

// now let's repeat the same with arrowFunction method

class Javascript extends Language {
    constructor() {
        this.name = "Javascript class"

        // using regularFunction method of class Language
        super.arrowFunction

    }
}

let newJs = new Javascript()

newJs.arrowFunction() // output: newJs.arrowFunction is not a function

```
- It's pretty confusing to think why **arrowFunction** was not inherited.
- Let's get back to **Language** class and see what really is happening there.


```javascript

class Language {
    constructor() {
        this.name = 'Javascript'
    }

    regularFunction() {
        console.log(`I'm the regular function ${this.name}`)
    }

    arrowFunction() {
        console.log(`I'm the arrow function of ${this.name}`)
    }
}

// cheacking the prototypes of Language class

console.log(Language.protoype) // output: {regularFunction: ƒ}

//only regularFunction has been attached as prototype method of this class.

```

>>Conclusion 
- Since we used the arrow function in a class property so it is only defined on the initialization by the constructor and not in the prototype. So, even if we mock our function in the instantiated object, the changes won’t be seen by other objects through prototype chaining.


## Why I like arrow function?

- While writing a callback function, most of the time I prefer to use arrow function as it works as **syntactic sugar**.
- As a React developer, I can say that it provides so much ease,by using it we can easily avoid binding the methods every time.


>> PS. (In technology its never enough in terms of learning, adding to that javascript is considerd as stupid language. So, feel free to correct me.)


