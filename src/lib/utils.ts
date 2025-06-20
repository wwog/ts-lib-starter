export class Counter {
  static instanceLength = 0
  private count = 0

  constructor() {
    Counter.instanceLength++
  }

  next() {
    if (this.count === Number.MAX_SAFE_INTEGER) {
      this.count = 0
    }
    return this.count++
  }
}

export class CounterId {
  private counter = new Counter()

  next() {
    const count = this.counter.next()
    const date = Date.now().toString(36)
    return `${date}-${Counter.instanceLength}-${count}`
  }
}
