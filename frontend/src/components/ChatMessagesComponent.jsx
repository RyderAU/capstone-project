import React from 'react';
import { Message, MessageSelf, Name, Text, TextSelf } from "../components/ChatCSS";

 // Actual message component
 // Accounts for msg being sent by current user, or another user
 const ChatMessagesComponent = (message) => {
  let msg = message["message"];

  return (
    <div aria-label="message-container">
      {
        msg["is_current_user"] && 
        <MessageSelf aria-label="message-self">
          <Name>
            {msg["name"]}
          </Name>

          { !msg["is_current_user"] && <Text> {msg["message"]} </Text> }
          { msg["is_current_user"] && <TextSelf> {msg["message"]} </TextSelf> }
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" stroke="black" stroke-width="0" fill="grey" />
          </svg> 
        </MessageSelf>
      }

      {
        !msg["is_current_user"] && 
        <Message aria-label="message-other">
          <Name>
            {msg["name"]}
          </Name>

          { !msg["is_current_user"] && <Text> {msg["message"]} </Text> }
          { msg["is_current_user"] && <TextSelf> {msg["message"]} </TextSelf> }
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" stroke="black" stroke-width="0" fill="grey" />
          </svg> 
        </Message>
      }

    </div>
  );
}

export default ChatMessagesComponent;
