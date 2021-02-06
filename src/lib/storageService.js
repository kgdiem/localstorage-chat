export const StorageKeys = {
  messages: "messages",
  users: "users",
};

export const StorageService = {
  get: (key) => {
    const val = localStorage.getItem(key);

    return val ? JSON.parse(val) : null;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  },
};
