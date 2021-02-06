import { UserService } from "../../lib/userService";
import { createUserSuccess } from "../actions";
import { CREATE_USER } from "../actionTypes";

export const createUserMiddleware = (store) => (next) => (action) => {
  if (action.type === CREATE_USER) {
    UserService.saveUser(action.payload.name).then((user) =>
      store.dispatch(createUserSuccess(user))
    );
  }

  return next(action);
};
