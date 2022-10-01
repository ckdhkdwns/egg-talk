import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 300px;
  margin: 0 auto;
`;
const Input = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 8px 10px;
  margin-bottom: 0.5rem;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 20%) 0px 0px 0px 1px inset;
  background: rgba(242, 241, 238, 0.6);
  font-size: 0.9rem;
  border: none;
  outline: none;
`;
const Label = styled.label`
  color: rgba(55, 53, 47, 0.65);
  font-size: 12px;
  font-family: "Noto Sans KR", sans-serif;
`;
const SignUpBtn = styled.button`
  border: 0;
  outline: 0;
  width: 100%;
  text-align: center;
  margin: 10px 0;
  padding: 7px 0;
  background: #66757f;
  border-radius: 3px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;

  :hover {
    background-color: #525e66;
  }
`;

type FormData = {
  username: string;
  password: string;
  nickname: string;
};

function Join() {
  const { register, handleSubmit } = useForm<FormData>();
  let navigate = useNavigate();

  const onValid = async (data: FormData) => {
    console.log(data);
    axios
      .post("https://egg-talk-server.run.goorm.io/api/signup", {
        username: data.username,
        password: data.password,
        nickname: data.nickname,
      })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const onInvalid = (error: any) => {
    console.log("error", error);
  };

  // console.log(watch()); // watch input value by passing the name of it

  useEffect(() => {
    // if token exist
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "")
      navigate("/chatroom");
  });

  return (
    <Wrapper>
      <Link style={{ width: "fit-content", margin: "0 auto" }} to={"/"}>
        <Logo />
      </Link>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <Label>아이디</Label>
        <Input
          {...register("username", { required: true, maxLength: 15 })}
          placeholder="아이디를 입력하세요."
        />
        <Label>비밀번호</Label>
        <Input
          {...register("password", { required: true, maxLength: 15 })}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <Label>닉네임</Label>
        <Input
          {...register("nickname", { required: true, maxLength: 15 })}
          placeholder="닉네임을 입력하세요."
        />
        <SignUpBtn>가입하기</SignUpBtn>
      </Form>
    </Wrapper>
  );
}

export default React.memo(Join);
