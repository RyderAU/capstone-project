import styled from 'styled-components';
import searchIconImg from "../images/search.png"

export const InputContainer = styled.div`
  position:relative;
  padding: 0 0 0 20px;
  margin: 0 20px;
  // background:#ddd;
  // direction: rtl;
  width: 180px;
  .search-input:focus + .search-container {
    // left: 25px;
    visibility: visible;
    // display: flex;
    // z-index: 0;
  }
`;

export const Input = styled.input`
  width: 150px;
  height: 25px;
  padding-left: 30px;
  // padding-right: 30px;
  margin: 8px auto;
//   display: inline-block;
//   border: 1px solid #ccc;
  border-radius: 25px;
//   box-sizing: border-box;
`;

export const SearchIcon = styled.img`
  height: 12px;
  position:absolute;
  left: 30px;
  top: 18px;
  // bottom:2px;
  // right:5px;
  // width:24px;
`
SearchIcon.defaultProps = {
  src: searchIconImg,
  alt: "Search Icon",
};

export const SearchTitle = styled.div`
  width: 100%;
  color: #333;
  text-align: center;
  padding: 7px 0;
  font-size: 0.8em;
  background-color: #bcbcbc;
  // margin: 2px 0 0 2px;
`;
export const SearchResultContainer = styled.div`
  width: 175px;
  // height: 50px;
  position: absolute;
  left: 25px;
  background: #dedede;
  border-radius: 10px;
  // display: hidden;
  visibility: hidden;
  // z-index: -1;
  display: flex;
  flex-direction: column;
`;

export const SearchComponentMain = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 3px 0;
  flex-direction: row;
  // background: #fff;
  & .avatar {
    // margin: auto;
    // margin-right: 8px;
    margin: 8px 8px 0 0;
  }
  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
  justify-content: center;
`;

export const SearchComponentText = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const SearchComponentTextDisplayName = styled.div`
  color: black;
  font-size: 0.8em;
`;

export const SearchComponentTextName = styled.div`
  color: #bcbcbc;
  font-size: 0.6em;
`;
