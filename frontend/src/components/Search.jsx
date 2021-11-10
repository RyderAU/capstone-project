import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { Input, InputContainer, SearchIcon, SearchResultContainer, SearchTitle } from "./SearchCSS";
import SearchComponent from './SearchComponent';

const Search = ( {courseid} ) => {
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [token, ] = context.token;
  const [query, setQuery] = useState("");
  const [queryList, setQueryList] = useState([]);

  // Send request to backend to retrieve all members
  const getMembers = (courseid) => {
    console.log("Loading search result...");

    // const tokenLocal = localStorage.getItem("token");
    // console.log(courseid);
    axios.get(`${url}/search?token=${token}&display_name=${query}`)
      .then(r => {
        handleSuccess(r);
      })
      .catch(err => {
        handleError(err);
      });
    };

  // Case 1: API returns success
  const handleSuccess = (response) => {
    console.log('Queries successfully loaded');
    console.log(response.data.result);
    const members = response.data.result;

    let members_list = [
      <SearchTitle>Search Result</SearchTitle>
    ];
    for (let i=members.length; i > 0; i--) {
        const mem_component = members[i-1];
        // console.log(mem_component.email);
        members_list.push(
          <SearchComponent
            key={i}
            email={mem_component.email}
            display_name={mem_component.display_name}
            name={mem_component.name} />
        )
    }
    setQueryList(members_list);
  };
  // };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Message Error');
    console.log(error);
  };

  React.useEffect(() => {
    getMembers(courseid);
    console.log("SEARCH MEMBERS");
  }, [query]);

    return (
        <InputContainer aria-label="input-container">
            <Input
                placeholder="Enter name"
                aria-label="search-input"
                className="search-input"
                onChange={(e) => setQuery(e.target.value)}
                onClick ={(e) => console.log("nooooooo")}/>
            {/* <SearchComponent
                aria-label="search-container"
                className="search-container">
                {queryList}
            </SearchComponent> */}
            <SearchResultContainer
                aria-label="search-container"
                className="search-container"
                onClick ={(e) => console.log("byeeeeeeeeee")} >
                {queryList}
            </SearchResultContainer>
            <SearchIcon />
        </InputContainer>
      );
};

export default Search;