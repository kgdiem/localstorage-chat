import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { createMessage, loadMessages, loadUser } from "../../redux/actions";
import {
  getCurrentUser,
  getMessages,
  getPageSize,
  getTotal,
} from "../../redux/selectors";
import { Message } from "../Message/Message";
import { MessageInput } from "../MessageInput/MessageInput";
import { useQuery } from "../../hooks";

export const Messenger = () => {
  const messageEndRef = useRef(null);
  const currentUser = useSelector(getCurrentUser);
  const messages = useSelector(getMessages);
  const total = useSelector(getTotal);
  const pageSize = useSelector(getPageSize);
  const dispatch = useDispatch();
  const query = useQuery();
  // Track didScroll to make sure another page doesn't load when we navigate to this page or double up once a new page was loaded
  const [didScroll, setDidScroll] = useState(false);

  const addMessage = (message) => {
    dispatch(createMessage(message, currentUser.id));
  };

  const messageScroll = (e) => {
    if (e.target.scrollTop === 0 && didScroll && messages.length < total) {
      dispatch(loadMessages());
      setDidScroll(false);
    } else {
      setDidScroll(true);
    }
  };

  useEffect(() => {
    dispatch(loadMessages());
  }, [dispatch]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        block: "end",
        //If first load, scroll auto, else do smooth
        behavior: messages.length === pageSize ? "auto" : "smooth",
      });
    }
  }, [messages, pageSize]);

  const userId = query.get("userId");

  if (!currentUser && userId) {
    dispatch(loadUser(userId));

    return <div></div>;
  }

  if (!currentUser || currentUser.error) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Container className="vh-100 d-flex flex-column" fluid>
      <Row
        className="flex-grow-1 mh-100 overflow-auto"
        onScroll={messageScroll}
      >
        <Col>
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              user={message.user}
              sent={message.userId === currentUser.id}
            ></Message>
          ))}
          <div ref={messageEndRef}></div>
        </Col>
      </Row>
      <Row className="border-top">
        <Col>
          <MessageInput onSend={addMessage}></MessageInput>
        </Col>
      </Row>
    </Container>
  );
};
