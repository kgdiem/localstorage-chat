import { UserService } from "../../../lib/userService";
import { storeMock } from "../../../__mocks__";
import { loadUsers, loadUsersSuccess } from "../../actions";
import { loadUsersMiddleware } from "../loadUsers";

describe("loadUsersMiddlware", () => {
  let dispatchSpy, getUsersSpy, getUsersPromise, getUsersValue, next;

  beforeEach(() => {
    getUsersValue = { test: 1 };
    getUsersPromise = Promise.resolve(getUsersValue);

    dispatchSpy = jest.spyOn(storeMock, "dispatch");
    getUsersSpy = jest
      .spyOn(UserService, "getUsers")
      .mockImplementation(() => getUsersPromise);
    next = jest.fn();
  });

  it("Should handle LOAD_USERS", async () => {
    const action = loadUsers();

    loadUsersMiddleware(storeMock)(next)(action);

    expect(getUsersSpy).toHaveBeenCalled();

    await getUsersPromise;

    expect(dispatchSpy).toHaveBeenCalledWith(loadUsersSuccess(getUsersValue));
  });

  it("Should pass action with next", () => {
    const action = loadUsers();

    loadUsersMiddleware(storeMock)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it("Should ignore other values", () => {
    const action = loadUsersSuccess();

    loadUsersMiddleware(storeMock)(next)(action);

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(getUsersSpy).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalledWith(action);
  });
});
