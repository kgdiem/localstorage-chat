import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import _ from "lodash";
import {
  createMessage,
  loadMessages,
  loadUser,
  getCurrentUser,
  getMessages,
  getPageSize,
  getTotal,
} from "../../redux";
import { Message } from "../Message";
import { MessageInput } from "../MessageInput";
import { useQuery } from "../../hooks";

export const Messenger = () => {
  const messageEndRef = useRef(null);
  const pageEndRef = useRef(null);
  const currentUser = useSelector(getCurrentUser);
  const messages = useSelector(getMessages);
  const total = useSelector(getTotal);
  const pageSize = useSelector(getPageSize);
  const dispatch = useDispatch();
  const query = useQuery();
  // Track didScroll to make sure another page doesn't load when we navigate to this page or double up once a new page was loaded
  const [didScroll, setDidScroll] = useState(false);
  const [pages, setPages] = useState([]);

  const scrollIntoView = (ref, block = "end", behavior = "auto") => {
    if (ref.current) {
      console.log("scrolling into view", ref, ref.current, behavior);
      ref.current.scrollIntoView({
        block: block,
        behavior: behavior,
      });
    }
  };

  const addMessage = (message) => {
    dispatch(createMessage(message, currentUser.id));
    scrollIntoView(pageEndRef, "end", "smooth");
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
    setPages(_.chunk(messages, pageSize));

    // If adding a message or on a fresh load, scroll to the end of the page
    if (!messages.length || messages.length === pageSize) {
      setTimeout(() => {
        scrollIntoView(pageEndRef);
      }, 1);
    } else {
      scrollIntoView(messageEndRef, "start");
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
          {pages.map((page, i) => (
            <div key={i}>
              {page.map((message) => (
                <Message
                  key={message.id}
                  text={message.text}
                  user={message.user}
                  sent={message.userId === currentUser.id}
                ></Message>
              ))}
              {i === 0 ? <div ref={messageEndRef}></div> : null}
            </div>
          ))}
        </Col>
        <div ref={pageEndRef}></div>
      </Row>
      <Row className="border-top">
        <Col>
          <MessageInput onSend={addMessage}></MessageInput>
        </Col>
      </Row>
    </Container>
  );
};
