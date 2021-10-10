import styled from 'styled-components';

export const Label = styled.label`
  margin: 8px auto;
  font-weight: bold;
  font-size: 0.9em;
  width: 250px;
  color: #fff;
`;

export const Title = styled.label`
  font-family: 'Luna';
  font-size: 36px;
  // color: rgb(26, 17, 145);
  color: #fff;
  // margin-top: 120px;
  // margin-left: 35%;
  margin: 30px auto;
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: #0d0f99;
  color: #fff;
  padding: 14px 20px;
  margin: 8px auto;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 250px;
  &:hover {
    // opacity: 0.8;
    font-weight: bold;
  }
`;

export const ButtonSecondary = styled.button`
  background-color: #ffffff;
  border-radius: 10px;
  color: #0d0f99;
  padding: 14px 20px;
  margin: 8px auto;
  border: 2px solid #0d0f99;
  cursor: pointer;
  width: 250px;
  &:hover {
    // background-color: #0d0f99;
    // color: #fff;
    // font-size: 0.8em;
    // opacity: 0.8;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  width: 250px;
  padding: 12px 20px;
  margin: 8px auto;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 75px auto;
  background-color: #0086E8;
  width: 350px;
  height: 500px;
  border-radius: 15px;
`;

export const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 75px auto;
  background-color: #0086E8;
  width: 350px;
  height: 650px;
  border-radius: 15px;
`;

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 75px auto;
  background-color: #0086E8;
  width: 350px;
  height: 250px;
  border-radius: 15px;
`;

export const ErrorWarning = styled.div`
  width: 100%;
  color: #FF7F7F;
  margin-top: 10px;
  text-align: right;
  font-size: 0.9em;
  text-align: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const BigTitle = styled.div`
  margin: 50px auto;
  padding: 0 50px;
  font-family: 'Luna';
  font-size: 36px;
  color: #333;
`