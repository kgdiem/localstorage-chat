import {
  CREATE_USER_SUCCESS,
  LOAD_USERS_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_USER_SUCCESS,
} from "../actionTypes";

const initialState = {
  users: [],
  currentUser: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    case LOAD_USER_ERROR: {
      return {
        ...state,
        currentUser: { error: true },
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
}
