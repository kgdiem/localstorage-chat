import { UserService } from "../../lib/userService";
import { loadUserError, loadUserSuccess } from "../actions";
import { LOAD_USER } from "../actionTypes";

export const loadUserMiddleware = (store) => (next) => (action) => {
  if (action.type === LOAD_USER) {
    UserService.getUser(action.payload.id).then((user) => {
      if (user) {
        store.dispatch(loadUserSuccess(user));
      } else {
        store.dispatch(loadUserError());
      }
    });
  }

  return next(action);
};
