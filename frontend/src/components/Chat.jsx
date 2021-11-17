import React from 'react';
import { ContainerMain } from "../components/ChatCSS";
import ChatMessages from "./ChatMessages";
import ChatMembers from './ChatMembers';

 // Chat functionality has the chat and the messages to the right
 const Chat = ( {courseid} ) => {

  return (
      <ContainerMain aria-label="chat-members-container">
        <ChatMessages courseid={courseid}/>
        <ChatMembers courseid={courseid}/>
      </ContainerMain>
  );
}

export default Chat;
