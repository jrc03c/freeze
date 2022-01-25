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
