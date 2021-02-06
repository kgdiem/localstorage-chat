import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

describe("App", () => {
  let component;

  beforeEach(() => {
    component = renderer.create(<App />);
  });

  it("Should render without error", () => {
    expect(component).toBeTruthy();
  });
});
