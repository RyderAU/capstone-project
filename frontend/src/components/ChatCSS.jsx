import styled from 'styled-components';
import icon from "../images/send.png"

export const ContainerMain = styled.div`
  // margin: 0px auto;
  // background-color: #EFDBD0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 85vh;
`;

export const ContainerChat = styled.div`
  width: 75%;
  height: 84vh;
  display: flex;
  flex-direction: column;
  // background-color: #EFDBD0;
`;

export const ChatMessagesList = styled.div`
  width: 100%;
  height: 74vh;
  background-color: #FFFCFC;
  display: flex;
  flex-direction: column-reverse;
  // justify-content: flex-end;
  overflow-y: scroll;
`;

export const Members = styled.div`
  width: 20%;
  height: 100%;
  background-color: #aaa;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 80px 0px 80px;
  max-width: 375px;
  // justify-content: flex-end;
  align-items: flex-start;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 80px 0px 80px;
  align-items: flex-start;
`;

export const MessageSelf = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 80px 0px 80px;
  align-items: flex-end;
`;

export const Name = styled.div`
  color: #666;
  font-size: 0.8em;
  padding: 5px 10px;
`

export const Text = styled.div`
  background-color: #E1E1E1;
  font-size: 1.1em;
  border-radius: 25px;
  padding: 15px 20px;
  max-width: 375px;
`;

export const TextSelf = styled.div`
  background-color: #EFDBD0;
  font-size: 1.2em;
  border-radius: 25px;
  padding: 15px 20px;
  max-width: 375px;
`;

export const MessageSendWrapper = styled.div`
  background-color: #EFDBD0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 10vh;
`;

export const MessageSendContainer = styled.div`
  // width: 30%;
  // height: 100%;
  // color: #ffffff;
  // background-color: #EFDBD0;
  // position: fixed;
  // bottom: 0;
  // width: 80%;
  // height: 100%;
`;

export const Input = styled.input`
  width: 80%;
  height: 6vh;
  padding: 12px 20px;
  margin-top: 15px;
  // display: inline-block;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-sizing: border-box;
`;

export const Icon = styled.img`
  height: 25px;
  width: 25px;
  margin: 20px 0 0 5px;
  &:hover {
    cursor: pointer;
  }
`;

Icon.defaultProps = {
  src: icon,
  alt: "Icon for messages",
};


export const ContainerMembers = styled.div`
  width: 25%;
  // height: 500px;
  height: 84vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: scroll;
`;

export const MemberList = styled.div`
  margin-bottom: 5px;
  width: 100%;
  height: 50px;
  // height: 500px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  background-color: #fff;
  color: black;
`;

export const Member = styled.div`
  display: flex;
  flex-direciton: row;
  // justify-content: center;
  align-items: center;
  height: 30px;
`;

export const MemberName = styled.div`
  color: black;
  font-size: 1em;
  width: 50px;
  margin-left: 15px;
`;
export const MembersTitle = styled.div`
  color: black;
  // text-align: center;
  font-size: 1.1em;
  font-weight: bold;
  margin: 10px auto;
`;