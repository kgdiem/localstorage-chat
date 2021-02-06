import { UserService } from "../../lib/userService";
import { loadUsersSuccess } from "../actions";
import { LOAD_USERS } from "../actionTypes";

export const loadUsersMiddleware = (store) => (next) => (action) => {
  if (action.type === LOAD_USERS) {
    UserService.getUsers().then((users) =>
      store.dispatch(loadUsersSuccess(users))
    );
  }

  return next(action);
};
