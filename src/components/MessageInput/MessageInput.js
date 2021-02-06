import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const MessageInput = ({ onSend = () => {} }) => {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message) {
      return;
    }

    onSend(message);

    setMessage("");
  };

  return (
    <div className="p-2">
      <InputGroup>
        <Form.Label htmlFor="messageInput" srOnly>
          Message
        </Form.Label>
        <Form.Control
          placeholder="Enter a message"
          id="messageInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.which === 13) {
              send();
            }
          }}
        ></Form.Control>
        <InputGroup.Append>
          <Button variant="primary" onClick={send}>
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};
