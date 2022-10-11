import { MainContainer } from "@chatscope/chat-ui-kit-react";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { API_URL, userData } from "../api";
import {
  currentRoomIdAtom,
  isLoginAtom,
  messagesAtom,
  newChatModalAtom,
  userInfoAtom,
} from "../atoms";
import Chat from "../components/Chat";
import Chatroom from "../components/Chatroom";
import Loader from "../components/Loader";
import NewChatModal from "../components/NewChatModal";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 100px 7vw;
`;
const Container = styled(MainContainer)`
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 10px;
`;

function Main() {
  const navigate = useNavigate();
  // const user = useRecoilValue(userInfoAtom);
  const setUser = useSetRecoilState<userData>(userInfoAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const newChatModalIsOpen = useRecoilValue(newChatModalAtom);
  const setMessages = useSetRecoilState(messagesAtom);
  const currentRoomId = useRecoilValue(currentRoomIdAtom);

  useEffect(() => {
    // if token doesn't exist or is empty string, let client login
    if (!isLogin) {
      navigate("/login");
      return;
    }

    const { token }: any = JSON.parse(localStorage.getItem("token")!);

    axios
      .get(API_URL + "/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response: AxiosResponse) {
        setUser(response.data);
      })
      .catch((error: any) => {
        console.log("error at /user/me", error);
      });
  }, [isLogin, navigate, setUser]);

  useEffect(() => {
    const { token }: any = JSON.parse(localStorage.getItem("token")!);
    currentRoomId &&
      axios
        .get("/rooms/" + currentRoomId + "/messages", {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log(res.data);
          setMessages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [currentRoomId]);

  return isLogin ? (
    <Wrapper>
      {true ? (
        <Container responsive>
          <Chatroom />
          <Chat />
        </Container>
      ) : (
        <Loader />
      )}
      <NewChatModal isOpen={newChatModalIsOpen} />
    </Wrapper>
  ) : null;
}

export default React.memo(Main);
