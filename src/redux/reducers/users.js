import { CREATE_USER_SUCCESS, LOAD_USERS_SUCCESS } from "../actionTypes";

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
    default: {
      return state;
    }
  }
}
