import { loadMessagesSuccess } from "../../actions";
import messages from "../messages";

describe("messages", () => {
  describe("LOAD_MESSAGES_SUCCESS", () => {
    it("Should reset messages on reload", () => {
      const state = {
        messages: [1, 2, 3],
      };

      const expectedMessages = { messages: [4, 5, 6] };

      const newState = messages(
        state,
        loadMessagesSuccess(expectedMessages, true)
      );

      expect(newState.messages).toEqual(expectedMessages.messages);
    });

    it("Should prepend messages on load", () => {
      const state = {
        messages: [4, 5, 6],
      };

      const newMessages = { messages: [1, 2, 3] };
      const expectedMessages = newMessages.messages.concat(state.messages);

      const newState = messages(state, loadMessagesSuccess(newMessages));

      expect(newState.messages).toEqual(expectedMessages);
    });

    it("Should copy other props from payload", () => {
      const state = {
        messages: [4, 5, 6],
      };

      const newMessages = {
        messages: [1, 2, 3],
        from: 0,
        pageSize: 54,
        total: 123,
      };

      const newState = messages(state, loadMessagesSuccess(newMessages));

      expect(newState.from).toBe(newMessages.from);
      expect(newState.pageSize).toBe(newMessages.pageSize);
      expect(newState.total).toBe(newMessages.total);
    });
  });
});
