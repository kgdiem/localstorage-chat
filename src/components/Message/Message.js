import React from "react";
import { Avatar } from "../Avatar";
import "./Message.css";

export const Message = ({ text, sent, user }) => (
  <div className={`message p-2 ${sent ? "sent" : "recieved"}`}>
    <Avatar user={user}></Avatar>
    <div className="message-text mx-2 py-2 px-3">
      <span>{text}</span>
    </div>
  </div>
);
