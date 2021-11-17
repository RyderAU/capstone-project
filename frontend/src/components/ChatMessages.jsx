import React, { useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import ChatMessagesComponent from './ChatMessagesComponent';
import MessageSend from './MessageSend';
import { ContainerChat, ChatMessagesList } from "../components/ChatCSS";

const ChatMessages = ( {courseid} ) => {
  const [messagesList, setMessagesList] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  // const [token, ] = context.token;
  const [messages, setMessages] = useState([]);

  // Send request to backend to retrieve all messages
  const getMessages = (courseid) => {
    const token = localStorage.getItem("token");
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
    setMessages(response.data["course_messages"]);

    let messages_list = [];
    for (let i=messages.length; i > 0; i--) {
        const msg_component = messages[i-1];
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

  React.useEffect(() => {
    window.setInterval(() => {
      setSeconds(s => s + 1);
    }, 750)
  }, []);

  // Get messages every 750ms
  React.useEffect(() => {
    getMessages(courseid);
  }, [seconds]);

  // Load messages on first refresh
  React.useEffect(() => {
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
