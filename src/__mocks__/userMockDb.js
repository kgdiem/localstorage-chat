import { UserService } from "../lib/userService";
import faker from "faker";

export const UserMockDb = {
  seed: async (amount = 10) => {
    for (let i = 0; i < amount; i++) {
      await UserService.saveUser(faker.name.findName());
    }
  },
};
