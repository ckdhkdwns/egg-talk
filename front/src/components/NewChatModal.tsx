import React from "react";
import { useForm } from "react-hook-form";
import Modal from "styled-react-modal";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { newChatModalAtom } from "../atoms";

const Container = styled.div`
  width: 450px;
  padding: 20px 32px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
`;
const Header = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  font-family: "Noto Sans KR";
  margin-left: 3px;
`;
const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  width: 100%;
  margin-right: 20px;
`;
const Input = styled.input`
  all: unset;
  width: 100%;
  margin-right: 20px;
  padding: 8px 10px;
  margin-bottom: 0.5rem;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 20%) 0px 0px 0px 1px inset;
  background: ${(props) => props.theme.inputColor};
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  border: none;
  outline: none;
  &::placeholder {
    font-weight: 100;
  }
`;
const Btn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 70px;
  height: 37px;
  padding: 7px 0;
  background: #66757f;
  outline: 0;
  border: 0;
  border-radius: 3px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :hover {
    background-color: #525e66;
  }
  a {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
    font-weight: 300;
  }
`;
const ErrorMessageArea = styled.div`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.redTextColor};
  font-size: 0.75rem;
  line-height: 1rem;
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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleClose = () => {
    setNewChatModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={handleClose}
      onEscapeKeydown={handleClose}
    >
      <Container>
        <Header>새 채팅방 만들기</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="채팅방 이름을 입력해주세요"
            {...register("roomname", {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
          />
          <Btn type="submit">만들기</Btn>
        </Form>
        {errors.roomname && (
          <ErrorMessageArea>채팅방 이름은 5 ~ 20자 입니다.</ErrorMessageArea>
        )}
      </Container>
    </Modal>
  );
}

export default React.memo(NewChatModal);
