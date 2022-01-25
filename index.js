class FrozenObjectAttemptedMutationError extends Error {}

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
        throw new FrozenObjectAttemptedMutationError(
          "This object is immutable!"
        )
      },

      deleteProperty() {
        throw new FrozenObjectAttemptedMutationError(
          "This object is immutable!"
        )
      },

      set() {
        throw new FrozenObjectAttemptedMutationError(
          "This object is immutable!"
        )
      },

      setPrototypeOf() {
        throw new FrozenObjectAttemptedMutationError(
          "This object is immutable!"
        )
      },
    })
  } else {
    return x
  }
}

if (typeof module !== "undefined") {
  module.exports = freeze
}

if (typeof window !== "undefined") {
  window.freeze = freeze
}
