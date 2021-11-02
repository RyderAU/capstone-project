import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import ChatMessages from "./ChatMessages";
import { ContainerMain, Messages, Members } from "../components/ChatCSS";
import ChatMembers from './ChatMembers';


 const Chat = (courseid) => {
  // const [seconds, setSeconds] = useState(0);
  // const context = React.useContext(StoreContext);
  // const [url, ] = context.url;
  // // const [token, ] = context.token;
  // const [messages, setMessages] = useState([]);

  // // Send request to backend to retrieve all messages
  // const getMessages = () => {
  //   console.log("Loading messages...");

  //   axios.get(`${url}/message/listall`, {
  //     token: "token",
  //     course_name: courseid,
  //   })
  //     .then(r => {
  //       handleSuccess(r);
  //     })
  //     .catch(err => {
  //       handleError(err);
  //     });
  //   };

  // // Case 1: API returns success
  // const handleSuccess = (response) => {
  //   console.log('Messages successfully loaded');
  //   console.log(response.data["course_messages"]);
  //   setMessages(response.data["course_messages"]);
  // };
  
  // // Case 2: API returns error
  // const handleError = (error) => {
  //   console.log('Message Error');
  //   console.log(error);
  // };

  // React.useEffect(() => {
  //   window.setInterval(() => {
  //     setSeconds(s => s + 1);
  //   }, 2000)
  // }, []);

  // React.useEffect(() => {
  //   getMessages();
  // }, [seconds]);


  return (
      <ContainerMain aria-label="chat-members-container">
        <ChatMessages courseid={courseid}/>
        {/* <ChatMessages messages={messages} courseid={courseid}/> */}
        {/* <ChatMembers courseid={courseid}/> */}
      </ContainerMain>
  );
}

export default Chat;
