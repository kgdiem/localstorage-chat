import {
  createUserSuccess,
  loadMessagesSuccess,
  loadUserError,
  loadUsersSuccess,
  loadUserSuccess,
} from "../../actions";
import users from "../users";

describe("users", () => {
  it("Should update currentUser on CREATE_USER_SUCCESS", () => {
    const user = { a: 1 };

    const state = users({}, createUserSuccess(user));

    expect(state.currentUser).toEqual(user);
  });

  it("Should update users on LOAD_USERS_SUCCESS", () => {
    const usersValue = [{ test: 1 }];

    const state = users({}, loadUsersSuccess(usersValue));

    expect(state.users).toEqual(usersValue);
  });

  it("Should ignore other values", () => {
    const state = { a: 1 };

    const newState = users(state, loadMessagesSuccess());

    expect(newState).toEqual(state);
  });

  it("Should update currentUser on LOAD_USER_SUCCESS", () => {
    const state = {};

    const user = { test: 1 };

    const newState = users(state, loadUserSuccess(user));

    expect(newState.currentUser).toEqual(user);
  });

  it("Should update currentUser on LOAD_USER_ERROR", () => {
    const state = {};

    const expectedState = { currentUser: { error: true } };

    const newState = users(state, loadUserError());

    expect(newState).toEqual(expectedState);
  });
});
