export class LocalStorageMock {
  items = {};

  getItem(key) {
    return this.items[key];
  }

  setItem(key, value) {
    this.items[key] = value;
  }
}
