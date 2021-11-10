import React from 'react';
// // import components
import { SearchComponentMain, SearchComponentText } from "../components/SearchCSS";


 const SearchComponent = (members) => {
  console.log(members)
  return (
    <SearchComponentMain>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" stroke="black" stroke-width="0" fill="grey" />
          </svg>
          <SearchComponentText>

          </SearchComponentText>
    </SearchComponentMain>
  );
}

export default SearchComponent;
