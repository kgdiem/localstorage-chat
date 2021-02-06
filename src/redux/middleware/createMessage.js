import { CREATE_MESSAGE } from "../actionTypes";
import { MessageService } from "../../lib/messageService";
import { loadMessages } from "../actions";

export const createMessageMiddleware = (store) => (next) => (action) => {
  if (action.type === CREATE_MESSAGE) {
    const { text, userId } = action.payload;

    MessageService.saveMessage(text, userId).then(() =>
      store.dispatch(loadMessages(true))
    );
  }

  return next(action);
};
