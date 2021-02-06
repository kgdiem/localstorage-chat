import { StorageService, StorageKeys } from "./storageService";
import Please from "pleasejs";
import { uuid } from "./uuid";

export const UserService = {
  getUser: function (id) {
    return new Promise((resolve) => {
      const users = _getUsers();

      const user = users.find((u) => u.id === id);

      resolve(user);
    });
  },
  getUsers: function () {
    return new Promise((resolve) => {
      const users = _getUsers();

      const userMap = {};

      users.forEach((user) => (userMap[user.id] = user));

      resolve(userMap);
    });
  },
  saveUser: function (name) {
    return new Promise((resolve) => {
      const user = this.createUser(name);

      this.addUser(user);

      resolve(user);
    });
  },
  addUser: function (user) {
    const users = _getUsers();

    const newUsers = [...users];

    newUsers.push(user);

    StorageService.set(StorageKeys.users, newUsers);
  },
  createUser: function (name) {
    return {
      name,
      id: uuid(),
      color: Please.make_color({ format: "hex" }),
    };
  },
};

function _getUsers() {
  const users = StorageService.get(StorageKeys.users) || [];

  return users;
}
