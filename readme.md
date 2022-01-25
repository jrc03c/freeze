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
// FrozenObjectAttemptedMutationError: This object is immutable!

const myList = freeze([1, 2, 3])
myList.push(42)
// FrozenObjectAttemptedMutationError: This object is immutable!
```

**Notes:**

I _think_ it works correctly. It at least passes all of the tests I wrote for it. But there might be sneaky ways of modifying objects or arrays that haven't occurred to me yet. If you find any, please let me know!

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
