import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentRoomIdAtom,
  isChatLoadingAtom,
  isDarkAtom,
  messagesAtom,
  roomsAtom,
} from "../atoms";
import Message from "./Message";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as SendIcon } from "../images/send.svg";
import Stomp from "stompjs";
import axios from "axios";
import { API_URL, TypeMessage } from "../api";
import { useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Loader from "./Loader";

const Wrapper = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 180px;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.isDark ? "#5c5c5c" : "#fff")};
  position: relative;
  border-top-right-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;
  border-left: 1px solid #0000003d;
`;
const Header = styled.div<{ isDark: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;
  height: 50px;
  position: relative;
  background: ${(props) => (props.isDark ? "#666666" : "#66757f")};
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
const ChatContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background: ${(props) => (props.isDark ? "#2c2d30" : "#f5f5f5")};
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
  background: #eaeaea;
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
  const isDark = useRecoilValue(isDarkAtom);
  const messages = useRecoilValue(messagesAtom);
  const setMessages = useSetRecoilState(messagesAtom);
  const rooms = useRecoilValue(roomsAtom);
  const roomId = useRecoilValue(currentRoomIdAtom);
  const [isChatLoading, setIsChatLoading] = useRecoilState(isChatLoadingAtom);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  let sock = new SockJS(API_URL + "/chat");
  let ws = Stomp.over(sock);
  const token = JSON.parse(localStorage["token"]).token;

  function connectServer() {
    ws.connect(
      { Authorization: JSON.parse(localStorage["token"]).token },
      () => {
        ws.subscribe("/sub/chat/room/" + roomId, (message) => {
          var recv: TypeMessage = JSON.parse(message.body);
          console.log(recv);
          // console.log("ref:", temp);
          // setMessages([...temp.current, recv]);
          setMessages((prev) => [...prev, recv]);
        });
        ws.send(
          "/pub/message",
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
  function onSend(messageData: any, e: any) {
    e.target[0].value = "";
    ws.send(
      "/pub/message",
      {
        Authorization: token,
      },
      JSON.stringify({
        messageType: 1,
        roomId: roomId,
        content: messageData.message,
      })
    );
  }

  useEffect(() => {
    console.log(`Entering room: ${roomId}`);
    // const { token }: any = JSON.parse(localStorage.getItem("token")!);
    if (roomId) {
      axios
        .get(API_URL + "/rooms/" + roomId + "/messages", {
          headers: { Authorization: token },
        })
        .then((res) => {
          // console.log(res.data);
          setMessages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      connectServer();
    }
  }, [roomId]);

  useEffect(() => {
    // temp.current = messages;
    scrollToBottom();
  }, [messages]);

  return (
    <Wrapper isDark={isDark}>
      <Header isDark={isDark}>
        {roomId && (
          <RoomName>
            {rooms.filter((room) => room?.roomId === roomId)[0]?.roomName}
          </RoomName>
        )}
        <SearchBtnContainer>
          <SearchIcon fill="#fff" />
        </SearchBtnContainer>
      </Header>
      {isChatLoading ? (
        <Loader />
      ) : (
        <>
          <ChatContainer ref={chatBoxRef} isDark={isDark}>
            <div style={{ width: "100%", height: "100%" }}>
              {messages.map((message, i) => {
                return <Message key={i} {...message} id={i} />;
              })}
            </div>
          </ChatContainer>
          <Form onSubmit={handleSubmit(onSend)}>
            <InputContainer>
              <Input
                {...register("message", {
                  required: "This is Required",
                  minLength: 1,
                })}
                placeholder="메세지를 입력하세요."
              />
              <SendBtn type="submit">
                <SendIcon fill="#cccccc" />
              </SendBtn>
            </InputContainer>
          </Form>
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Chat);
