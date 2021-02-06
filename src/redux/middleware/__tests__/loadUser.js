import { UserService } from "../../../lib/userService";
import { storeMock } from "../../../__mocks__";
import { loadUser, loadUserError, loadUserSuccess } from "../../actions";
import { loadUserMiddleware } from "../loadUser";

describe("loadUserMiddleware", () => {
  let dispatchSpy, getUserSpy, getUserPromise, userValue, next;

  beforeEach(() => {
    userValue = { test: 1 };
    getUserPromise = Promise.resolve(userValue);

    dispatchSpy = jest.spyOn(storeMock, "dispatch");

    getUserSpy = jest
      .spyOn(UserService, "getUser")
      .mockImplementation(() => getUserPromise);

    next = jest.fn();
  });

  it("Should dispatch loadUserSuccess if user is found", async () => {
    loadUserMiddleware(storeMock)(next)(loadUser());

    await getUserPromise;

    expect(dispatchSpy).toHaveBeenCalledWith(loadUserSuccess(userValue));
  });

  it("Should dispatch loadUserError if user is not found", async () => {
    getUserPromise = Promise.resolve(null);

    loadUserMiddleware(storeMock)(next)(loadUser());

    await getUserPromise;

    expect(dispatchSpy).toHaveBeenCalledWith(loadUserError());
  });

  it("Should pass action with next", () => {
    const action = loadUser();

    loadUserMiddleware(storeMock)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it("Should ignore other values", () => {
    const action = loadUserSuccess();

    loadUserMiddleware(storeMock)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(getUserSpy).not.toHaveBeenCalled();
  });
});
