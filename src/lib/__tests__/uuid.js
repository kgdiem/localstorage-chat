import _ from "lodash";
import { uuid } from "../uuid";

describe("uuid", () => {
  it("Should return a string", () => {
    const id = uuid();

    expect(typeof id).toBe("string");
  });

  it("Should return unique values", () => {
    const id1 = uuid();
    const id2 = uuid();

    expect(id1).not.toBe(id2);
  });

  it("Should return large sample of unique values", () => {
    const ids = [];

    for (let i = 0; i < 10000; i++) {
      ids.push(uuid());
    }

    expect(_.uniq(ids).length).toBe(ids.length);
  });
});
