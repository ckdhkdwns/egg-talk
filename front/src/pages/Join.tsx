import axios from "axios";
import React, { useEffect, useState } from "react";
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
const ErrorMessageArea = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1rem;
  color: red;
`;

type FormData = {
  username: string;
  password: string;
  nickname: string;
};

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const onValid = async (data: FormData) => {
    // console.log(data);
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
        // Case 1. Unauthorized
        error.request.status === 409 && setIsValid(false);
        //Case 2. Internal server error
        error.code === "ERR_NETWORK" && console.log("Internal Server");
      });
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
      <Form onSubmit={handleSubmit(onValid)}>
        <Label>아이디</Label>
        <Input
          {...register("username", {
            required: "아이디를 입력해주세요.",
            minLength: { value: 5, message: "아이디가 너무 짧습니다" },
            maxLength: { value: 20, message: "아이디가 너무 깁니다" },
            pattern: {
              value: /^[A-Za-z0-9].{5,20}$/,
              message: "아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.",
            },
          })}
          placeholder="아이디를 입력하세요."
        />
        <Label>비밀번호</Label>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: { value: 8, message: "비밀번호가 너무 짧습니다" },
            maxLength: { value: 20, message: "비밀번호가 너무 깁니다" },
            pattern: {
              value: /^[A-Za-z0-9].{5,20}$/,
              message:
                "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
            },
          })}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <Label>닉네임</Label>
        <Input
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            maxLength: { value: 15, message: "닉네임가 너무 깁니다" },
          })}
          placeholder="닉네임을 입력하세요."
        />
        <SignUpBtn>가입하기</SignUpBtn>
        {errors.username ? (
          <ErrorMessageArea>{errors.username.message}</ErrorMessageArea>
        ) : errors.password ? (
          <ErrorMessageArea>{errors.password.message}</ErrorMessageArea>
        ) : errors.nickname ? (
          <ErrorMessageArea>{errors.nickname.message}</ErrorMessageArea>
        ) : !isValid ? (
          <ErrorMessageArea>
            이미 존재하는 아이디(로그인 전용 아이디)입니다. 다른 아이디를
            입력해주세요.
          </ErrorMessageArea>
        ) : null}
      </Form>
    </Wrapper>
  );
}

export default React.memo(Join);
