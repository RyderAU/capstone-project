import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { ContainerMembers, MembersTitle } from "./ChatCSS";
import ChatMembersComponent from './ChatMembersComponent';

const Members = (courseid) => {
  const [seconds, setSeconds] = useState(0);
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [token, ] = context.token;
  const [members, setMembers] = useState([]);
  const [membersList, setMembersList] = useState([]);

  // Send request to backend to retrieve all members
  const getMembers = (courseid) => {
    console.log("Loading members...");

    axios.get(`${url}/channel/members`, {
      token: token,
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
    setMembers(response.data["member_details"]);

    let members_list = [];
    for (let i=members.length; i > 0; i--) {
        const mem_component = members[i-1];
        console.log(mem_component);
        members_list.push(
          <ChatMembersComponent member={mem_component} />
        )
    }
    setMembersList(members_list);
  };
  // };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Message Error');
    console.log(error);
  };

  React.useEffect(() => {
    window.setInterval(() => {
      setSeconds(s => s + 1);
    }, 3000)
  }, []);

  React.useEffect(() => {
    getMembers(courseid);
  }, [seconds]);
  
  return (
    <ContainerMembers aria-label="member-container">
      <MembersTitle>Members</MembersTitle>
      {membersList}
    </ContainerMembers>
 
  );
}

export default Members;
