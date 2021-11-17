import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { Input, MessageSendWrapper, Icon } from "../components/ChatCSS";

 // sending a message to the chat
 const MessageSend = ( {courseid} ) => {
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  // const [token, ] = context.token;
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");

  const handleMsgSend = () => {
    console.log("Message sender to send: " + message);
    axios.post(`${url}/message/send`, {
      token: token,
      course_name: courseid,
      message: message,
    })
      .then(r => {
        handleSuccess(r);
      })
      .catch(err => {
        handleError(err);
      });
    };

  // Case 1: API returns success
  const handleSuccess = (response) => {
    console.log('Message sent success');
    setMessage("");
  };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Message sent failure');
    console.log(error);
  };

  const executeMsgSendEnter = () => {
    handleMsgSend();
  };


  return (
      <MessageSendWrapper>
        <Input value={message} onChange={(e) => setMessage(e.target.value)}
          type="text" placeholder="Type a message..." id="message-input" required />
        <Icon onClick={() => handleMsgSend()} />
      </MessageSendWrapper>
  );
}

export default MessageSend;
