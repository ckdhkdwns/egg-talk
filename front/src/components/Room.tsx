import React from "react";
import styled from "styled-components";
import { API_URL, TypeRoom } from "../api";
import { useSetRecoilState } from "recoil";
import { currentRoomIdAtom, messagesAtom } from "../atoms";
import axios, { AxiosResponse } from "axios";

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
  &:hover {
    background: #ddd8d0;
  }
`;
const RoomName = styled.div`
  font-weight: bold;
`;

function Room({ ...room }: TypeRoom) {
  const setRoomId = useSetRecoilState(currentRoomIdAtom);
  const setMessages = useSetRecoilState(messagesAtom);

  const onClick = () => {
    console.log(room.roomId);
    setRoomId(room.roomId);

    const { token }: any = JSON.parse(localStorage.getItem("token")!);
    axios
      .get(API_URL + `/rooms/${room.roomId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response: AxiosResponse) {
        console.log(`/rooms/${room.roomId}/messages`, response);
        setMessages(response.data);
      })
      .catch((error: any) => {
        console.log("error:", error);
      });
  };

  return (
    <Wrapper onClick={onClick}>
      <RoomName>{room.roomName}</RoomName>
    </Wrapper>
  );
}

export default React.memo(Room);
