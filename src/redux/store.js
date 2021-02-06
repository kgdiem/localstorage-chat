import { createStore, applyMiddleware } from "redux";
import {
  createMessageMiddleware,
  createUserMiddleware,
  loadMessagesMiddleware,
  loadUsersMiddleware,
  loadUserMiddleware,
} from "./middleware";
import reducer from "./reducers";

export const store = createStore(
  reducer,
  applyMiddleware(
    createMessageMiddleware,
    createUserMiddleware,
    loadMessagesMiddleware,
    loadUsersMiddleware,
    loadUserMiddleware
  )
);
