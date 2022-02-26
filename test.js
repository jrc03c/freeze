const freeze = require("./index.js")

test("ensures that one-dimensional arrays are correctly frozen", () => {
  const x = freeze([2, 3, 4])

  x[0] = 5
  expect(x[0]).toBe(2)

  expect(() => {
    x.push(5)
  }).toThrow()

  expect(() => {
    x.splice(0, 1)
  }).toThrow()

  delete x[0]
  expect(x[0]).toBe(2)

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

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x[0]
  }).not.toThrow()

  expect(x).toStrictEqual([2, 3, 4])
})

test("ensures that two-dimensional arrays are correctly frozen", () => {
  const x = freeze([
    [2, 3, 4],
    [5, 6, 7],
  ])

  x[0] = "foo"
  expect(x[0]).toStrictEqual([2, 3, 4])

  x[0][0] = "foo"
  expect(x[0][0]).toBe(2)

  expect(() => {
    x.push(5)
  }).toThrow()

  expect(() => {
    x.splice(0, 1)
  }).toThrow()

  delete x[0]
  expect(x[0]).toStrictEqual([2, 3, 4])

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

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x[0]
  }).not.toThrow()

  expect(x).toStrictEqual([
    [2, 3, 4],
    [5, 6, 7],
  ])
})

test("ensures that shallow objects are correctly frozen", () => {
  const x = freeze({ foo: "bar" })

  x.hello = "world"
  expect(x.hello).toBe(undefined)

  delete x.foo
  expect(x.foo).toBe("bar")

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

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x.foo
  }).not.toThrow()

  expect(x).toStrictEqual({ foo: "bar" })
})

test("ensures that deeply-nested objects are correctly frozen", () => {
  const x = freeze({
    foo: "bar",
    settings: { name: { first: "James", last: "Bond" } },
  })

  x.hello = "world"
  expect(x.hello).toBe(undefined)

  x.settings.name.first = "Julia"
  expect(x.settings.name.first).toBe("James")

  delete x.foo
  expect(x.foo).toBe("bar")

  delete x.settings.name.first
  expect(x.settings.name.first).toBe("James")

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

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x.foo
  }).not.toThrow()

  expect(() => {
    x.settings.name.first
  }).not.toThrow()

  expect(x).toStrictEqual({
    foo: "bar",
    settings: { name: { first: "James", last: "Bond" } },
  })
})
