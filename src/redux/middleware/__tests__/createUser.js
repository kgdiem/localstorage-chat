import { UserService } from "../../../lib/userService";
import { storeMock } from "../../../__mocks__";
import { createUser, createUserSuccess } from "../../actions";
import { createUserMiddleware } from "../createUser";

describe("createUserMiddlware", () => {
  let dispatchSpy, saveUserSpy, saveUserPromise, next, userValue;

  beforeEach(() => {
    userValue = {
      name: "Test",
    };

    saveUserPromise = Promise.resolve(userValue);

    dispatchSpy = jest.spyOn(storeMock, "dispatch");

    saveUserSpy = jest
      .spyOn(UserService, "saveUser")
      .mockImplementation(() => saveUserPromise);

    next = jest.fn();
  });

  it("Should handle CREATE_USER", async () => {
    const action = createUser(userValue.name);

    createUserMiddleware(storeMock)(next)(action);

    expect(saveUserSpy).toHaveBeenCalledWith(userValue.name);

    await saveUserPromise;

    expect(dispatchSpy).toHaveBeenLastCalledWith(createUserSuccess(userValue));
  });

  it("Should pass action with next", () => {
    const action = createUser(userValue.name);

    createUserMiddleware(storeMock)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it("Should ignore other values", () => {
    const action = createUserSuccess();

    createUserMiddleware(storeMock)(next)(action);

    expect(saveUserSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });
});
