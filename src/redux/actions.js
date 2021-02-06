import {
  CREATE_MESSAGE,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
} from "./actionTypes";

export const createUser = (name) => ({
  type: CREATE_USER,
  payload: { name },
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: { user },
});

export const loadUsers = () => ({
  type: LOAD_USERS,
});

export const loadUsersSuccess = (users) => ({
  type: LOAD_USERS_SUCCESS,
  payload: { users },
});

export const createMessage = (text, userId) => ({
  type: CREATE_MESSAGE,
  payload: { text, userId },
});

export const loadMessages = (reload = false) => ({
  type: LOAD_MESSAGES,
  payload: { reload },
});

export const loadMessagesSuccess = (messages, reload = false) => ({
  type: LOAD_MESSAGES_SUCCESS,
  payload: { messages, reload },
});
