function freeze(x) {
  if (typeof x === "object") {
    const temp = (() => {
      if (x instanceof Array) {
        return x.map(v => freeze(v))
      } else {
        const out = {}

        Object.keys(x).forEach(key => {
          out[key] = freeze(x[key])
        })

        return out
      }
    })()

    return new Proxy(Object.assign(x instanceof Array ? [] : {}, temp), {
      defineProperty() {
        throw new Error("This variable is immutable!")
      },

      deleteProperty() {
        throw new Error("This variable is immutable!")
      },

      set() {
        throw new Error("This variable is immutable!")
      },

      setPrototypeOf() {
        throw new Error("This variable is immutable!")
      },
    })
  } else {
    return x
  }
}

module.exports = freeze
