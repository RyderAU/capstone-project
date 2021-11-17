import React from 'react';
import { MemberList, Member, MemberName } from "../components/ChatCSS";


 const ChatMembersComponent = (member) => {

  return (
      <MemberList>
        <Member>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" stroke="black" stroke-width="0" fill="#bbb" />
          </svg> 
          <MemberName>
            {member["member"]["name"]}
          </MemberName>
        </Member>
      </MemberList>

  );
}

export default ChatMembersComponent;
