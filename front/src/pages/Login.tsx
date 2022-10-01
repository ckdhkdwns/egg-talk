import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 935px;
  width: 100%;
  margin: 100px auto;
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  width: 50%;
  padding: 32px;
`;
const LeftImage = styled.img`
  width: 100%;
`;
const RightContainer = styled.div`
  max-width: 450px;
  width: 50%;
  padding: 32px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 258px;
  margin: 0 auto;
`;
const Input = styled.input`
  all: unset;
  margin: 0.5rem 0;
  padding: 8px 10px;
  margin-bottom: 0.5rem;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 20%) 0px 0px 0px 1px inset;
  background: rgba(242, 241, 238, 0.6);
  font-size: 0.9rem;
  &::placeholder {
    font-weight: 100;
  }
`;
const LoginBtn = styled.input`
  text-align: center;
  margin: 10px 0;
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

  :hover {
    background-color: #525e66;
  }
  a {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
    font-weight: 300;
  }
`;
const Label = styled.label`
  color: rgba(55, 53, 47, 0.65);
  font-size: 12px;
  font-family: "Noto Sans KR", sans-serif;
`;

type FormData = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    // if token exist
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "")
      navigate("/chatroom");
  });

  const onValid = async (data: FormData) => {
    axios
      .post("https://egg-talk-server.run.goorm.io/api/authenticate", {
        ...data,
      })
      .then(function (response: AxiosResponse) {
        console.log("res.data.accessToken : ", response.data.token);
        localStorage.setItem(
          "token",
          JSON.stringify({ token: response.data.token })
        );
        navigate("/chatroom");
      })
      .catch(function (error: AxiosError) {
        console.log(error.request.statusText);
      });
  };

  const onInvalid = (error: any) => {
    console.log("error", error);
  };

  return (
    <Wrapper>
      <LeftContainer>
        <LeftImage
          src="https://img.e-chats.com/e/img/552226f2a5fc97ad.png"
          alt="main-left"
        />
      </LeftContainer>
      <RightContainer>
        <Link style={{ width: "fit-content", margin: "0 auto" }} to={"/"}>
          <Logo />
        </Link>
        <Form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Label>아이디</Label>
          <Input
            {...register("username", { required: true, maxLength: 15 })}
            placeholder="아이디를 입력하세요"
          />
          <Label>비밀번호</Label>
          <Input
            {...register("password", { required: true, maxLength: 15 })}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          <LoginBtn type="submit" value="로그인" />
          <Label style={{ margin: "5px 0 0 3px" }}>
            <Link to={"/signup"}>가입하기</Link>
          </Label>
        </Form>
      </RightContainer>
    </Wrapper>
  );
}

export default React.memo(Login);
