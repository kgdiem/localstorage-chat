import { UserMockDb } from "../../__mocks__";
import { StorageKeys, StorageService } from "../storageService";
import { UserService } from "../userService";

describe("UserService", () => {
  beforeEach(async () => {
    localStorage.items = {};

    await UserMockDb.seed();
  });

  describe("getUser", () => {
    it("Should return a user for an id that exists", async () => {
      const [user] = StorageService.get(StorageKeys.users);

      const retrievedUser = await UserService.getUser(user.id);

      expect(retrievedUser).toEqual(user);
    });

    it("Should return falsy for user id that does not exist", async () => {
      const user = await UserService.getUser("bananas 1");

      expect(user).toBeFalsy();
    });
  });

  describe("getUsers", () => {
    it("Should return id:user object", async () => {
      const users = StorageService.get(StorageKeys.users);

      const userIds = users.map((u) => u.id);

      const userMap = await UserService.getUsers();

      userIds.forEach((id) => expect(userMap[id]).toBeTruthy());
    });
  });

  describe("saveUser", () => {
    it("Should return a user with a given name", async () => {
      const name = "test";

      const user = await UserService.saveUser(name);

      expect(user).toBeTruthy();
      expect(user.id).toBeDefined();
      expect(user.color).toBeDefined();
      expect(user.name).toBe(name);
    });
  });

  describe("addUser", () => {
    it("Should store a user in localStorage", () => {
      const name = "test";

      const user = UserService.createUser(name);

      UserService.addUser(user);

      const users = StorageService.get(StorageKeys.users);

      const latestUser = users[users.length - 1];

      expect(latestUser).toEqual(user);
    });
  });

  describe("createUser", () => {
    it("Should return a user object given a name", () => {
      const name = "test";

      const user = UserService.createUser(name);

      expect(user).toBeTruthy();
      expect(user.name).toBe(name);
      expect(user.id).toBeTruthy();
      expect(user.color).toBeTruthy();
    });
  });
});
