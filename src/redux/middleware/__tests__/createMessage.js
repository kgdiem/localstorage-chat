import { MessageService } from "../../../lib/messageService";
import { storeMock } from "../../../__mocks__";
import { createMessage, loadMessages } from "../../actions";
import { createMessageMiddleware } from "../createMessage";

describe("createMessageMiddlware", () => {
  let dispatchSpy, saveMessageSpy, saveMessagePromise, next;

  beforeEach(() => {
    saveMessagePromise = Promise.resolve();

    dispatchSpy = jest.spyOn(storeMock, "dispatch");
    saveMessageSpy = jest
      .spyOn(MessageService, "saveMessage")
      .mockImplementation(() => saveMessagePromise);

    next = jest.fn();
  });

  it("Should handle CREATE_MESSAGE", async () => {
    const text = "test";
    const userId = 123;

    createMessageMiddleware(storeMock)(next)(createMessage(text, userId));

    expect(saveMessageSpy).toHaveBeenCalledWith(text, userId);

    await saveMessagePromise;

    expect(dispatchSpy).toHaveBeenCalledWith(loadMessages(true));
  });

  it("Should pass action with next", () => {
    const text = "test";
    const userId = 123;

    const action = createMessage(text, userId);
    createMessageMiddleware(storeMock)(next)(action);

    expect(next).toHaveBeenLastCalledWith(action);
  });

  it("Should ignore other values", () => {
    const action = loadMessages();
    createMessageMiddleware(storeMock)(next)(action);

    expect(saveMessageSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });
});
