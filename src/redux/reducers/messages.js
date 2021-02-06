import { LOAD_MESSAGES_SUCCESS } from "../actionTypes";

const initialState = {
  from: 0,
  pageSize: 25,
  total: 0,
  messages: [],
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES_SUCCESS: {
      const { messages, reload } = action.payload;

      const newMessages = reload
        ? [...messages.messages]
        : [...messages.messages, ...state.messages];

      return { ...state, ...messages, messages: newMessages };
    }
    default: {
      return state;
    }
  }
}
