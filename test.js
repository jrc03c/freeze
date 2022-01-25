const freeze = require("./index.js")

test("ensures that one-dimensional arrays are correctly frozen", () => {
  const x = freeze([2, 3, 4])

  expect(() => {
    x[0] = 5
  }).toThrow()

  expect(() => {
    x.push(5)
  }).toThrow()

  expect(() => {
    x.splice(0, 1)
  }).toThrow()

  expect(() => {
    delete x[0]
  }).toThrow()

  expect(() => {
    Object.defineProperty(x, [0], {
      get() {
        return "foo"
      },
    })
  }).toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).toThrow()

  expect(() => {
    x.prototype = Number
  }).toThrow()

  expect(() => {
    x[0]
  }).not.toThrow()
})

test("ensures that two-dimensional arrays are correctly frozen", () => {
  const x = freeze([
    [2, 3, 4],
    [5, 6, 7],
  ])

  expect(() => {
    x[0] = "foo"
  }).toThrow()

  expect(() => {
    x[0][0] = "foo"
  }).toThrow()

  expect(() => {
    x.push(5)
  }).toThrow()

  expect(() => {
    x.splice(0, 1)
  }).toThrow()

  expect(() => {
    delete x[0]
  }).toThrow()

  expect(() => {
    Object.defineProperty(x, 0, {
      get() {
        return "foo"
      },
    })
  }).toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).toThrow()

  expect(() => {
    x.prototype = Number
  }).toThrow()

  expect(() => {
    x[0]
  }).not.toThrow()
})

test("ensures that shallow objects are correctly frozen", () => {
  const x = freeze({ foo: "bar" })

  expect(() => {
    x.hello = "world"
  }).toThrow()

  expect(() => {
    delete x.foo
  }).toThrow()

  expect(() => {
    Object.defineProperty(x, "hello", {
      get() {
        return "world"
      },
    })
  }).toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).toThrow()

  expect(() => {
    x.prototype = Number
  }).toThrow()

  expect(() => {
    x.foo
  }).not.toThrow()
})

test("ensures that deeply-nested objects are correctly frozen", () => {
  const x = freeze({
    foo: "bar",
    settings: { name: { first: "James", last: "Bond" } },
  })

  expect(() => {
    x.hello = "world"
  }).toThrow()

  expect(() => {
    x.settings.name.first = "Julia"
  }).toThrow()

  expect(() => {
    delete x.foo
  }).toThrow()

  expect(() => {
    delete x.settings.name.first
  }).toThrow()

  expect(() => {
    Object.defineProperty(x, "hello", {
      get() {
        return "world"
      },
    })
  }).toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).toThrow()

  expect(() => {
    x.prototype = Number
  }).toThrow()

  expect(() => {
    x.foo
  }).not.toThrow()

  expect(() => {
    x.settings.name.first
  }).not.toThrow()
})
