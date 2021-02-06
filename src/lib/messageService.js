import { StorageService, StorageKeys } from "./storageService";
import { UserService } from "./userService";
import { uuid } from "./uuid";

export const MessageService = {
  getMessages: async function (from = 0, pageSize = 25) {
    const messages = _getMessages();
    // Get users to simulate a database join
    const users = await UserService.getUsers();

    const total = messages.length;
    const max = messages.length;

    const response = {
      from,
      pageSize,
      total,
    };

    if (from > max) {
      response.messages = [];

      return response;
    } else if (max < pageSize) {
      response.messages = _joinMessages(messages, users);

      return response;
    }

    let start = max - (pageSize + from);
    const end = max - from;

    if (start < 0) {
      start = 0;
    }

    const requestedMessages = _joinMessages(messages.slice(start, end), users);

    response.messages = requestedMessages;

    return response;
  },
  saveMessage: function (text, userId) {
    return new Promise(async (resolve) => {
      const message = this.createMessage(text, userId);

      this.addMessage(message);

      // Get user to perform 'join'
      const user = await UserService.getUser(userId);

      resolve({ ...message, user });
    });
  },
  addMessage: function (message) {
    const messages = _getMessages();

    const newMessages = [...messages];

    newMessages.push(message);

    StorageService.set(StorageKeys.messages, newMessages);
  },
  createMessage: function (text, userId) {
    const message = {
      text,
      userId,
      id: uuid(),
    };

    return message;
  },
};

function _joinMessages(messages, users) {
  const merged = messages.map((message) => ({
    ...message,
    user: users ? users[message.userId] : null,
  }));

  return merged;
}

function _getMessages() {
  const messages = StorageService.get(StorageKeys.messages) || [];

  return messages;
}
