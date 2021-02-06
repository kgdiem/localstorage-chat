import { MessageService } from "../../../lib/messageService";
import { storeMock } from "../../../__mocks__";
import { loadMessages, loadMessagesSuccess } from "../../actions";
import { loadMessagesMiddleware } from "../loadMessages";

describe("loadMessagesMiddlware", () => {
  let dispatchSpy,
    getMessagesSpy,
    getMessagesPromise,
    messageValue,
    next,
    defaultState;

  beforeEach(() => {
    defaultState = {
      messages: {
        from: 0,
        pageSize: 25,
        messages: [],
        total: 0,
      },
    };

    storeMock.getState = () => defaultState;
    messageValue = { test: 1 };
    getMessagesPromise = Promise.resolve(messageValue);

    dispatchSpy = jest.spyOn(storeMock, "dispatch");
    getMessagesSpy = jest
      .spyOn(MessageService, "getMessages")
      .mockImplementation(() => getMessagesPromise);
    next = jest.fn();
  });

  describe("LOAD_MESSAGES", () => {
    it("Should call getMessages with from=0 when no results yet", async () => {
      loadMessagesMiddleware(storeMock)(next)(loadMessages());

      expect(getMessagesSpy).toHaveBeenCalledWith(
        0,
        defaultState.messages.pageSize
      );

      await getMessagesPromise;

      expect(dispatchSpy).toHaveBeenCalledWith(
        loadMessagesSuccess(messageValue)
      );
    });

    it("Should set from to 0 if reload is passed", async () => {
      defaultState.messages.from = 123;

      loadMessagesMiddleware(storeMock)(next)(loadMessages(true));

      expect(getMessagesSpy).toHaveBeenCalledWith(
        0,
        defaultState.messages.pageSize
      );

      await getMessagesPromise;

      expect(dispatchSpy).toHaveBeenCalledWith(
        loadMessagesSuccess(messageValue, true)
      );
    });

    it("Should not call getMessages if length >= total", () => {
      defaultState.messages.messages = new Array(25);

      loadMessagesMiddleware(storeMock)(next)(loadMessages());

      expect(getMessagesSpy).not.toHaveBeenCalled();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it("Should increment from & run search when results exist", () => {
      defaultState.messages.messages = new Array(25);
      defaultState.messages.total = 200;

      const { pageSize, from } = defaultState.messages;

      const expectedFrom = from + pageSize;

      loadMessagesMiddleware(storeMock)(next)(loadMessages());

      expect(getMessagesSpy).toHaveBeenCalledWith(expectedFrom, pageSize);
    });
  });

  it("Should pass action with next", () => {
    loadMessagesMiddleware(storeMock)(next)(loadMessages());

    expect(next).toHaveBeenCalled();
  });

  it("Should ignore other values", () => {
    loadMessagesMiddleware(storeMock)(next)(loadMessagesSuccess());

    expect(next).toHaveBeenCalled();
    expect(getMessagesSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
