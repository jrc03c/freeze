`freeze` is a little function that returns an immutable copy of a JS object or array.

**Install:**

```bash
npm install --save https://github.com/jrc03c/freeze
```

**Use:**

```js
const freeze = require("@jrc03c/freeze")

const person = freeze({ name: "Alice" })
person.name = "Bob"
console.log(person.name)
// Alice

const myList = freeze([1, 2, 3])
myList.push(42)
// Uncaught TypeError: Cannot add property 3, object is not extensible
```

**Notes:**

JavaScript already has a built-in function that does some of the work: [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze). The problem with it, though, is that it doesn't work on nested values. That means that if you're working with a multi-dimensional array or deeply-nested object, `Object.freeze` will only freeze the shallowest layer of properties of the array or object; the deeper properties will still be mutable. So, this library's `freeze` function just applies `Object.freeze` in a recursive way. That's it!

As you may have noticed from the above example, attempts at mutation will sometimes throw errors and sometimes fail silently. For example, when trying to assign a value to a property (e.g., `person.name = "Bob"`), no error will be thrown; but an error _will_ be thrown when trying to append an item to an array (e.g., `myList.push(42)`).

In general, I _think_ that the `freeze` function works correctly. It at least passes all of the tests I wrote for it. But there might be sneaky ways of modifying objects or arrays that haven't occurred to me yet. If you find any, please let me know!

Oh, also: it only works on raw arrays and objects; it does _not_ work on custom class instantiations. I mean, technically it'll return a frozen object to you if you try to freeze such an object, but the returned object will have been stripped of its functions and will be a plain JS object (just as if you'd done `JSON.parse(JSON.stringify(myObj))` on it). For example:

```js
const freeze = require("@jrc03c/freeze")

class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hello! My name is ${this.name}!`)
  }
}

const p = freeze(new Person("Alice"))
console.log(p.name) // Alice
p.sayHi() // TypeError: p.sayHi is not a function
console.log(p) // { name: 'Alice' }
```
