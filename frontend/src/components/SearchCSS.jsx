import styled from 'styled-components';
import searchIconImg from "../images/search.png"

const inputFocus = false;

export const InputContainer = styled.div`
  position:relative;
  padding: 0 0 0 20px;
  margin: 0 20px;
  // background:#ddd;
  // direction: rtl;
  width: 180px;
  .search-input:focus + .search-container {
    display: flex;
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
`;
export const SearchResultContainer = styled.div`
  width: 175px;
  height: 50px;
  position: absolute;
  left: 25px;
  background: #ddd;
  border-radius: 10px;
  display: none;
`;

export const SearchComponentMain = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

export const SearchComponentText = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
`;

