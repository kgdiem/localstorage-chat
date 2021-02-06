import { MessageService } from "../messageService";
import { StorageKeys, StorageService } from "../storageService";
import { UserMockDb, MessageMockDb } from "../../__mocks__";
import { UserService } from "../userService";
import _ from "lodash";

describe("MessageService", () => {
  beforeEach(async () => {
    localStorage.items = {};

    await UserMockDb.seed();
    await MessageMockDb.seed();
  });

  describe("getMessages", () => {
    let storedMessages, max;

    beforeEach(() => {
      storedMessages = StorageService.get(StorageKeys.messages);
      max = storedMessages.length;
    });

    it("Should default to 25 messages", async () => {
      const messages = await MessageService.getMessages();

      expect(messages.messages.length).toBe(25);
    });

    it("Should return most recent 25 messages", async () => {
      const start = max - 25;

      const mostRecent = storedMessages.slice(start, max);

      const messages = await MessageService.getMessages(0, 25);

      expect(messages.messages.length).toBe(25);
      expect(messages.messages.map((m) => m.id)).toEqual(
        mostRecent.map((m) => m.id)
      );
    });

    it("Should return second page of messages", async () => {
      const start = max - 50;
      const end = max - 25;

      const requestedMessages = storedMessages.slice(start, end);

      const messages = await MessageService.getMessages(25, 25);

      expect(messages.messages.length).toBe(25);
      expect(messages.messages.map((m) => m.id)).toEqual(
        requestedMessages.map((m) => m.id)
      );
    });

    it("Should return unique values when paginating", async () => {
      let from = 0;
      let results = [];

      while (from < max) {
        const messages = await MessageService.getMessages(from);

        results = results.concat(messages);

        from += messages.length;
      }

      const messageIds = results.map((m) => m.id);

      expect(_.uniq(messageIds).length).toBe(messageIds.length);
    });

    it("Should return empty array if requesting out of range messages", async () => {
      const messages = await MessageService.getMessages(5000);

      expect(messages.messages).toEqual([]);
    });

    it("Should return all messages if pageSize > num messages", async () => {
      const messages = await MessageService.getMessages(0, 5000);

      expect(messages.messages.length).toBe(storedMessages.length);
    });
  });

  describe("saveMessage", () => {
    let currentUser;

    beforeEach(async () => {
      const users = await UserService.getUsers();

      const [userId] = Object.keys(users);

      currentUser = users[userId];
    });

    it("Should return a message object with given text and user id", async () => {
      const text = "Hey";
      const userId = currentUser.id;

      const message = await MessageService.saveMessage(text, userId);

      expect(message).toBeTruthy();
      expect(message.text).toBe(text);
      expect(message.userId).toBe(userId);
      expect(message.user).toEqual(currentUser);
    });
  });

  describe("addMessage", () => {
    it("Should store a message in localStorage", () => {
      const text = "Hey";
      const userId = 1234;

      const message = MessageService.createMessage(text, userId);

      MessageService.addMessage(message);

      const messages = StorageService.get(StorageKeys.messages);

      const latestMessage = messages[messages.length - 1];

      expect(latestMessage).toEqual(message);
    });
  });

  describe("createMessage", () => {
    it("Should return a message object with given text and user id", () => {
      const text = "Hey";
      const userId = 1234;

      const message = MessageService.createMessage(text, userId);

      expect(message).toBeTruthy();
      expect(message.text).toBe(text);
      expect(message.userId).toBe(userId);
      expect(message.id).toBeDefined();
    });
  });
});
