function freeze(x) {
  if (typeof x === "object") {
    if (x instanceof Array) {
      return Object.freeze(x.map(v => freeze(v)))
    } else {
      const out = {}

      Object.keys(x).forEach(key => {
        out[key] = freeze(x[key])
      })

      return Object.freeze(out)
    }
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
