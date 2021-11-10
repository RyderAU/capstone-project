import React, { useState } from 'react';
// // import components
import axios from 'axios';
import { StoreContext } from '../Store';
import ChatMessagesComponent from './ChatMessagesComponent';
import MessageSend from './MessageSend';
import { ContainerChat, ChatMessagesList } from "../components/ChatCSS";

const ChatMessages = ( {courseid} ) => {
// const ChatMessages = (messages, courseid) => {
  const [messagesList, setMessagesList] = useState([]);

  const [seconds, setSeconds] = useState(0);
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [token, ] = context.token;
  const [messages, setMessages] = useState([]);

  // console.log(courseid.courseid["courseid"]);
  // Send request to backend to retrieve all messages
  const getMessages = (courseid) => {
    console.log("Loading messages...");

    const tokenLocal = localStorage.getItem("token");
    // console.log("HHHHHHHHHHHHH:" + courseid);
    console.log(courseid);
    axios.get(`${url}/message/listall?token=${token}&course_name=${courseid}`)
      .then(r => {
        handleSuccess(r);
      })
      .catch(err => {
        handleError(err);
      });
    };

  // Case 1: API returns success
  const handleSuccess = (response) => {
    console.log('Messages successfully loaded');
    console.log(response.data["course_messages"]);
    setMessages(response.data["course_messages"]);

    let messages_list = [];
    for (let i=messages.length; i > 0; i--) {
        const msg_component = messages[i-1];
        // console.log(msg_component);
        messages_list.push(
          <ChatMessagesComponent key={i} message={msg_component} />
        )
    }
    setMessagesList(messages_list);
  };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Message Error');
    console.log(error);
  };

  // let interval = 5000;
  // if (seconds == 0) {
  //   interval = 1000;
  // };
  // if (seconds == 1) {
  //   interval = 5000;
  // };
  React.useEffect(() => {
    window.setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000)
  }, []);

  React.useEffect(() => {
    getMessages(courseid);
    console.log("RUN MESSAGE");
  }, [seconds]);

  React.useEffect(() => {
    console.log("RUN MESSAGE FAST");
    getMessages(courseid);
  }, []);

  return (
    <ContainerChat aria-label="chat-container">
      <ChatMessagesList aria-label="messages-list">
        {messagesList}
      </ChatMessagesList>
      <MessageSend messagesList={messagesList} setMessagesList={setMessagesList} courseid={courseid}/>
    </ContainerChat>
 
  );
}

export default ChatMessages;
