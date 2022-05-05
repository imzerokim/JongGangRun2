class Subject {
  constructor() {
    this.unsubscribeAll();
  }
  subscribe(observer) {
    if (observer != null) this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter((non) => non != observer);
  }
  unsubscribeAll() {
    this.observers = [];
  }
  notifySubscribers(source, ...others) {
    for (let i of this.observers) i.update(source, ...others);
  }
}

export { Subject };
