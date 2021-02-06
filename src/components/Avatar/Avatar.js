import React, { useEffect, useState } from "react";
import "./Avatar.css";

export const Avatar = ({ user }) => {
  const [name, setName] = useState("");
  const [avatarText, setAvatarText] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name.split(" ");

      const avatarText = `${firstName[0].toUpperCase()}${
        lastName ? lastName[0].toUpperCase() : ""
      }`;

      setAvatarText(avatarText);
      setColor(user.color);
      setName(user.name);
    }
  }, [user]);

  return (
    <div className="user" style={{ backgroundColor: color }} title={name}>
      {avatarText}
    </div>
  );
};
