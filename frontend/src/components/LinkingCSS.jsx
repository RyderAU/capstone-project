import styled from 'styled-components';
// import backgroundImage from "../images/illustration.jpeg"
import backgroundImage from "../images/sunrise.jpeg"
// import logoUNSWImage from "../images/unswlogo.png"
import logoUNSWImage from "../images/logo.png"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const Background = styled.img`
  height: 100%;
  width: 100%;
`
Background.defaultProps = {
  src: backgroundImage,
  alt: "UNSW background",
};

export const SignInBox = styled.div`
  max-width: 440px;
  padding: 44px;
  height: 338px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
`
export const LogoUNSW = styled.img`
  height: 36px;
  width: 168px;
`
LogoUNSW.defaultProps = {
  src: logoUNSWImage,
  alt: "UNSW background",
};

export const SignInTitle =styled.div`
  font-size: 1.5em;
  font-weight: bold;
  padding: 10px 0;
`
export const Input =styled.input`
  width: 350px;
  padding: 6px 0px;
  height: 32px;
  border: none;
  border-bottom: 1px solid;
  border-color: #666;
  border-width: 1px;
  font-size: 0.9em;
  // margin: 8px auto;
  // border: 1px solid #ccc;
  // box-sizing: border-box;
`

export const Button = styled.button`
  background-color: #005EA6;
  color: #fff;
  font-size: 1.0em;
  padding: 14px 20px;
  // margin: 25px 90px 8px 0px;
  margin-left: 20px;
  border: none;
  cursor: pointer;
  width: 100px;
  &:hover {
    // opacity: 0.8;
    font-weight: bold;
  }
`;
export const SpinnerContainer = styled.div`
  margin: 25px 90px 8px 0px;
  display: flex;
  justify-content: flex-end;
`
export const LoadingWarning = styled.div`
  color: red;
  text-align: right;
  margin: 10px 90px 8px 0px;
  font-size: 0.8em;
`