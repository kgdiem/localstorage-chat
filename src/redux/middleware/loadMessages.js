import { LOAD_MESSAGES } from "../actionTypes";
import { MessageService } from "../../lib/messageService";
import { loadMessagesSuccess } from "../actions";

export const loadMessagesMiddleware = (store) => (next) => (action) => {
  if (action.type === LOAD_MESSAGES) {
    const { reload } = action.payload;

    const { from, pageSize, messages, total } = store.getState().messages;

    let _from = from;

    if (reload) {
      _from = 0;
    } else if (messages.length && messages.length >= total) {
      return;
    } else if (messages.length) {
      _from += pageSize;
    }

    MessageService.getMessages(_from, pageSize).then((messages) =>
      store.dispatch(loadMessagesSuccess(messages, reload))
    );
  }

  return next(action);
};
