import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { Input, MessageSendWrapper, Icon } from "../components/ChatCSS";
import ChatMessagesComponent from './ChatMessagesComponent';


 const MessageSend = (messagesList, setMessagesList, courseid) => {
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [token, ] = context.token;
  const [message, setMessage] = useState("");

  const handleMsgSend = () => {
    console.log("Message sender to send: " + message);

    console.log(courseid);
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

    // // Sending the message on the frontend
    // messages.push(
    //   <ChatMessagesComponent message={message} />
    // )
    // Don't need to manually put the frontend component in,
    // Messages/listall is called very few seconds
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

  // Can't get enter to work
  // React.useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. ");
  //       event.preventDefault();
  //       console.log(message)
  //       // executeMsgSendEnter();
  //       // handleMsgSend();
  //       // {() => handleMsgSend()}
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);


  return (
      <MessageSendWrapper>
        {/* <MessageSendContainer>
            
        </MessageSendContainer> */}
        {/* <div> */}
        <Input value={message} onChange={(e) => setMessage(e.target.value)}
          type="text" placeholder="Type a message..." id="message-input" required />
        <Icon onClick={() => handleMsgSend()} />
        {/* </div> */}

      </MessageSendWrapper>
  );
}

export default MessageSend;
