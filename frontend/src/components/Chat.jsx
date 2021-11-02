import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { ContainerMain } from "../components/ChatCSS";
import ChatMessages from "./ChatMessages";
import ChatMembers from './ChatMembers';


 const Chat = (courseid) => {

  return (
      <ContainerMain aria-label="chat-members-container">
        <ChatMessages courseid={courseid}/>
        <ChatMembers courseid={courseid}/>
      </ContainerMain>
  );
}

export default Chat;
