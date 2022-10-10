import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentRoomIdAtom,
  messagesAtom,
  roomsAtom,
  userInfoAtom,
} from "../atoms";
import Message from "./Message";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as SendIcon } from "../images/send.svg";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { API_URL, TypeMessage } from "../api";
import { useForm } from "react-hook-form";
import SockJS from "sockjs-client";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 180px;
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  border-top-right-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;
  border-left: 1px solid #0000003d;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;
  height: 50px;
  position: relative;
  background: #66757f;
  border-top-right-radius: inherit;
`;
const RoomName = styled.div`
  color: white;
  font-weight: 600;
`;
const SearchBtnContainer = styled.div`
  position: absolute;
  right: 15px;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding: 6px;
  background: #c0c1c1;
`;
const Form = styled.form`
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  outline: 0;
  background: #dfdfdf;
  border: 0;
  padding: 5px 10px;
`;
const SendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
  border-radius: 2px;
  border: 0;
  outline: 0;
  background-color: #66757f;
  cursor: pointer;

  &:hover {
    background-color: #454d52;
  }
`;

function Chat() {
  const messages = useRecoilValue(messagesAtom);
  const setMessages = useSetRecoilState(messagesAtom);
  const rooms = useRecoilValue(roomsAtom);
  const roomId = useRecoilValue(currentRoomIdAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  let ws = Stomp.over(new SockJS(API_URL + "/ws/chat"));
  const token = localStorage["token"].token;

  function connectServer() {
    ws.connect(
      { Authorization: token },
      function (frame: any) {
        console.log(frame);
        ws.subscribe("/topic/chat/room/" + roomId, (message) => {
          var recv: TypeMessage = JSON.parse(message.body);
          console.log(recv);
          setMessages([...messages, { ...recv }]);
        });
        ws.send(
          "/app/chat/message",
          {
            Authorization: token,
          },
          JSON.stringify({
            messageType: 0,
            roomId: roomId,
          })
        );
      },
      function (error: any) {
        console.log(error);
      }
    );
  }
  const enterRoom = async () => {
    await connectServer();
    await axios
      .get("/rooms/" + roomId + "/messages", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSend = (message: any, e: any) => {
    e.preventDefault();
    e.target[0].value = "";

    userInfo &&
      roomId &&
      setMessages([
        ...messages,
        {
          createdDate: new Date().toLocaleDateString(),
          id: messages.length,
          messageType: 1,
          roomId: roomId,
          userId: 0,
          username: userInfo.username,
          content: message.message,
        },
      ]);

    ws.send(
      "/app/chat/message",
      {
        Authorization: token,
      },
      JSON.stringify({
        messageType: 1,
        roomId: roomId,
        message: message.message,
      })
    );
  };

  useEffect(() => {
    if (roomId !== 0) {
      enterRoom();
    }
  }, [roomId]);

  return (
    <Wrapper>
      <Header>
        {roomId && (
          <RoomName>
            {rooms.filter((room) => room?.roomId === roomId)[0]?.roomName}
          </RoomName>
        )}
        <SearchBtnContainer>
          <SearchIcon fill="#fff" />
        </SearchBtnContainer>
      </Header>
      <ChatContainer>
        <div style={{ width: "100%", height: "100%" }}>
          {messages.map((message, i) => {
            return <Message key={i} {...message} />;
          })}
        </div>
      </ChatContainer>
      <Form onSubmit={handleSubmit(onSend)}>
        <InputContainer>
          <Input
            {...register("message", { required: "This is Required" })}
            placeholder="메세지를 입력하세요."
          />
          <SendBtn type="submit">
            <SendIcon fill="#cccccc" />
          </SendBtn>
        </InputContainer>
      </Form>
    </Wrapper>
  );
}

export default React.memo(Chat);
