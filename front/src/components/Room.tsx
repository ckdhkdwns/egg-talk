import React from "react";
import styled from "styled-components";
import { API_URL, TypeRoom } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentRoomIdAtom, isDarkAtom, messagesAtom } from "../atoms";
import axios, { AxiosResponse } from "axios";

const Wrapper = styled.li<{ isDark: boolean; isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: ${(props) =>
    props.isDark
      ? props.isSelected
        ? "#b78b00"
        : "#161616"
      : props.isSelected
      ? "#e5e5e5"
      : "#fff"};
  color: ${(props) => props.theme.textColor};
  padding: 10px;
  border-bottom: ${(props) =>
    props.isDark ? "1px solid #646464" : "1px solid lightgray"};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.isDark ? "#b78b00" : "#e5e5e5")};
  }
`;
const RoomName = styled.div`
  font-weight: 400;
`;

function Room({ ...room }: TypeRoom) {
  const setRoomId = useSetRecoilState(currentRoomIdAtom);
  const setMessages = useSetRecoilState(messagesAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const currentRoomId = useRecoilValue(currentRoomIdAtom);

  const onClick = () => {
    console.log("CURRENT ROOM:", room.roomId);
    setRoomId(room.roomId);

    // const { token }: any = JSON.parse(localStorage.getItem("token")!);
    // axios
    //   .get(API_URL + `/rooms/${room.roomId}/messages`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response: AxiosResponse) {
    //     console.log(`/rooms/${room.roomId}/messages`, response);
    //     setMessages(response.data);
    //   })
    //   .catch((error: any) => {
    //     console.log("error:", error);
    //   });
  };

  return (
    <Wrapper
      isDark={isDark}
      isSelected={room.roomId === currentRoomId}
      onClick={onClick}
    >
      <RoomName>{room.roomName}</RoomName>
    </Wrapper>
  );
}

export default React.memo(Room);
