import styled from 'styled-components';
import backgroundImage from "../images/illustration.jpeg"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
`
Img.defaultProps = {
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
`