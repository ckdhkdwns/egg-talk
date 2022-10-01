import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
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
const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
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

const ErrorMessageArea = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1rem;
  color: red;
`;

type FormData = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    // if token exist
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "")
      navigate("/chatroom");
  });

  const onValid = async (data: FormData) => {
    setIsFetching(true);
    axios
      .post("https://egg-talk-server.run.goorm.io/api/authenticate", {
        ...data,
      })
      .then(function (response: AxiosResponse) {
        // console.log("res.data.accessToken : ", response.data.token);
        setIsFetching(false);
        localStorage.setItem(
          "token",
          JSON.stringify({ token: response.data.token })
        );
        navigate("/chatroom");
      })
      .catch(function (error: AxiosError) {
        // console.log(error);

        setIsFetching(false);
        // Case 1. Unauthorized
        error.request.status === 401 && setIsAuthorized(false);
        //Case 2. Internal server error
        error.code === "ERR_NETWORK" && console.log("Internal Server");
      });
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
        <Form onSubmit={handleSubmit(onValid)}>
          <Label>아이디</Label>
          <Input
            {...register("username", {
              required: "This is Required",
            })}
            placeholder="아이디를 입력하세요"
          />
          {/* <ErrorMessage errors={errors} name="username" /> */}
          <Label>비밀번호</Label>
          <Input
            {...register("password", {
              required: "This is Required",
            })}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          {/* <ErrorMessage errors={errors} name="password" /> */}
          <LoginBtn type="submit">
            {isFetching ? (
              <TailSpin
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "로그인"
            )}
          </LoginBtn>
          <Label style={{ margin: "5px 0 0 3px" }}>
            <Link to={"/signup"}>가입하기</Link>
          </Label>
          {errors.username ? (
            <ErrorMessageArea>아이디를 입력해 주세요.</ErrorMessageArea>
          ) : errors.password ? (
            <ErrorMessageArea>비밀번호를 입력해 주세요.</ErrorMessageArea>
          ) : !isAuthorized ? (
            <ErrorMessageArea>
              아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.
              입력하신 내용을 다시 확인해주세요.
            </ErrorMessageArea>
          ) : null}
        </Form>
      </RightContainer>
    </Wrapper>
  );
}

export default React.memo(Login);
