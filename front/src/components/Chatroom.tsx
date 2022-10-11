import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { API_URL } from "../api";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as AddIcon } from "../images/add.svg";
import {
  currentRoomIdAtom,
  isDarkAtom,
  isLoginAtom,
  newChatModalAtom,
  roomsAtom,
  userInfoAtom,
} from "../atoms";
import Room from "./Room";

const Wrapper = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30vw;
  min-width: 300px;
  height: 100%;
  background-color: ${(props) => (props.isDark ? "#2c2d30" : "#f5f5f5")};
  border-top-left-radius: 0.125rem;
  border-bottom-left-radius: 0.125rem;
`;
const Header = styled.div<{ isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  background: ${(props) => (props.isDark ? "#666666" : "#66757f")};
  color: white;
  border-top-left-radius: inherit;
  border-bottom: ${(props) =>
    props.isDark ? "1px solid #4e4e4e" : "1px solid lightgray"};
`;
const HeaderTitle = styled.div`
  margin-left: 15px;
  font-weight: 600;
`;
const HeaderItems = styled.button`
  all: unset;
  display: flex;
  justify-content: flex-end;
`;
const HeaderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  width: 35px;
  height: 35px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: #0000002e;
  }
`;
const RoomList = styled.ul`
  overflow-y: auto;
  height: 100%;
`;

function Chatroom() {
  const navigate = useNavigate();
  const isDark = useRecoilValue(isDarkAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const rooms = useRecoilValue(roomsAtom);
  const setRooms = useSetRecoilState(roomsAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const setRoomId = useSetRecoilState(currentRoomIdAtom);
  const setNewChatModal = useSetRecoilState(newChatModalAtom);

  useEffect(() => {
    // if token doesn't exist or is empty string, let client login
    if (!isLogin) {
      navigate("/login");
      return;
    }

    const { token }: any = JSON.parse(localStorage.getItem("token")!);

    userInfo &&
      axios
        .get(API_URL + `/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response: AxiosResponse) {
          console.log("/rooms =>", response.data);
          setRooms(response.data);
          setRoomId(response.data[0].roomId);
        })
        .catch((error: any) => {
          console.log(`error at /rooms =>`, error);
        });
  }, [isLogin, navigate, setRoomId, userInfo]);

  return (
    <Wrapper isDark={isDark}>
      <Header isDark={isDark}>
        <HeaderTitle>채팅</HeaderTitle>
        <HeaderItems>
          <HeaderItem>
            <SearchIcon fill="#fff" />
          </HeaderItem>
          <HeaderItem onClick={() => setNewChatModal(true)}>
            <AddIcon fill="#fff" />
          </HeaderItem>
        </HeaderItems>
      </Header>
      <RoomList>
        {rooms?.map((room, i) => (
          <Room key={i} {...room} />
        ))}
      </RoomList>
    </Wrapper>
  );
}

export default React.memo(Chatroom);
