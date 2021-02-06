import { MessageService } from "../lib/messageService";
import faker from "faker";
import { UserService } from "../lib/userService";

const randomUserId = (userIds) => {
  const max = userIds.length;

  const index = Math.floor(Math.random() * max);

  return userIds[index];
};

export const MessageMockDb = {
  seed: async (amount = 200) => {
    const users = await UserService.getUsers();
    const userIds = Object.keys(users);

    for (let i = 0; i < amount; i++) {
      await MessageService.saveMessage(
        faker.lorem.words(),
        randomUserId(userIds)
      );
    }
  },
};
