import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TypeMessage } from "../api";
import { userInfoAtom } from "../atoms";

const Wrapper = styled.div<{ incoming: Boolean }>`
  width: 100%;
  margin: 10px 0;
  text-align: ${(props) => (props.incoming ? "start" : "end")};
  font-size: 0.8rem;
`;
const Sender = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  margin: 0 0 10px 10px;
`;
const MessageContainer = styled.div<{ incoming: Boolean }>`
  display: inline-block;
  width: fit-content;
  max-width: 60%;
  padding: 15px 10px;
  border-radius: 13px;
  background: ${(props) => (props.incoming ? "#f7c7c7" : "#c1e4ec")};
  word-break: break-all;
`;
const GetRoom = styled.div`
  text-align: center;
  color: #9b9797;
`;

function Message(model: TypeMessage) {
  const userInfo = useRecoilValue(userInfoAtom); // test32
  const isIncoming = !(model.username === userInfo?.username);

  return (
    <Wrapper incoming={isIncoming}>
      {model.messageType === 0 || model.messageType === 2 ? (
        <GetRoom>{model.message}</GetRoom>
      ) : (
        <>
          {isIncoming && <Sender>{model.username}</Sender>}
          <MessageContainer incoming={isIncoming}>
            {model.message}
          </MessageContainer>
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Message);
