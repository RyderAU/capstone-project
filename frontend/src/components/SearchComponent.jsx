import React from 'react';
import axios from 'axios';
// // import components
import { useHistory } from 'react-router-dom'
import { StoreContext } from '../Store';
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
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;

  const handleProfile = () => {
    // event.stopPropagation();
    console.log("Sending to target profile page")
    console.log(members.display_name);

    const box = document.getElementById("search-container");
    // console.log(box);
    box.style.display = "none";

    history.push(`/dashboard/${display_name}`);
    // axios.get(`${url}/dashboard/${members.display_name}`)
    // .then(r => {
    //   handleSuccess(r);
    // })
    // .catch(err => {
    //   handleError(err);
    // });
  };

  // const handleSuccess = (res) => {
  //   console.log(res);
  // };

  // const handleError = (error) => {
  //   console.log(error);
  // };


  return (
    <SearchComponentMain
      aria-label="user-query-component"
      onClick={() => {handleProfile()}}>
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
