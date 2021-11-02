import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { ContainerMembers } from "./ChatCSS";

const Members = (courseid) => {
  const [seconds, setSeconds] = useState(0);
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [members, setMembers] = useState([]);

  // Send request to backend to retrieve all members
  const getMembers = (courseid) => {
    console.log("Loading members...");

    axios.get(`${url}/channel/members`, {
      token: "sdfkljsf",
      course_name: courseid,
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
    console.log('Members successfully loaded');
    console.log(response.data["member_details"]);


  };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Message Error');
    console.log(error);
  };

  // React.useEffect(() => {
  //   getMessages();
  // }, []);

  React.useEffect(() => {
    window.setInterval(() => {
      setSeconds(s => s + 1);
    }, 4000)
  }, []);

  React.useEffect(() => {
    getMembers(courseid);
  }, [seconds]);
  
  return (
    <ContainerMembers>
      
    </ContainerMembers>
 
  );
}

export default Members;
