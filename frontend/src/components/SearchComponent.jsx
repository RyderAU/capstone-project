import React from 'react';
// // import components
import { SearchComponentMain, SearchComponentText,
  SearchComponentTextName, SearchComponentTextDisplayName } from "../components/SearchCSS";

/**
 * Component wrapping two things:
 * -> The avatar and the div containing the display_name in black text
 *    and the name in grey text
 * Background turns white when hovered over.
 * @param {*} members 
 * @returns 
 */
 const SearchComponent = (members) => {

  const handleProfile = (event) => {
    event.stopPropagation();
    console.log("Sending to target profile page")
    console.log(members.email);
  };

  window.onclick = e => {
    console.log(e.target);  // to get the element
    console.log(e.target.tagName);  // to get the element tag name alone
  }

  return (
    <SearchComponentMain
      aria-label="user-query-component"
      onClick={(e) => {e.stopPropagation(); console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")}}>
          <svg height="30" width="30" className="avatar">
            <circle cx="15" cy="15" r="15" stroke="black" stroke-width="0" fill="grey" />
          </svg>
          <SearchComponentText>
            <SearchComponentTextDisplayName>{members.display_name}</SearchComponentTextDisplayName>
            <SearchComponentTextName>{members.name}</SearchComponentTextName>
          </SearchComponentText>
    </SearchComponentMain>
  );
}

export default SearchComponent;
