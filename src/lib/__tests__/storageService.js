import { StorageService } from "../storageService";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.items = {};
  });

  it("Should save stingified object in localStorage", () => {
    const key = "test";
    const value = { a: 1 };

    StorageService.set(key, value);

    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  it("Should return object from localStorage", () => {
    const key = "test";
    const value = { a: 1 };

    StorageService.set(key, value);

    const output = StorageService.get(key);

    expect(output).toEqual(value);
  });
});
