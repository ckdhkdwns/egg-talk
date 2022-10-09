import React from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { newChatModalAtom } from "../atoms";

// const Wrapper = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 1000;
// `;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  margin: 100px auto;
  padding: 20px;
  background: beige;
  border-radius: 10px;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
`;
const Header = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 300;
  font-family: "Noto Sans KR";
`;
const Form = styled.form``;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
const Btn = styled.div<{ color: string }>`
  margin: 0.375rem;
  color: #fff;
  background-color: ${(props) => props.color};
  text-transform: uppercase;
  word-wrap: break-word;
  white-space: normal;
  border: 0;
  border-radius: 0.125rem;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  padding: 0.6rem 2.14rem;
  font-size: 0.81rem;
  font-weight: 300;
  font-family: "Noto Sans KR";
`;

interface IModal {
  isOpen: boolean;
}

function NewChatModal({ isOpen }: IModal) {
  const setNewChatModalIsOpen = useSetRecoilState(newChatModalAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const handleClose = () => {
    setNewChatModalIsOpen(false);
  };

  return (
    <ReactModal isOpen={isOpen}>
      <div>모달입니다.</div>
      <button onClick={handleClose}>나가기</button>
      {/* <Container>
        <Header>새 채팅방 만들기</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="채팅방 이름"
            {...register("채팅방 이름", { required: true, max: 20, min: 5 })}
          />
        </Form>
        <Footer>
          <Btn color="#000000">창 닫기</Btn>
          <Btn color="#8b0909">만들기</Btn>
        </Footer>
      </Container> */}
    </ReactModal>
  );
}

export default React.memo(NewChatModal);
