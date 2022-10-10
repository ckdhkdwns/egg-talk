import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { API_URL } from "../api";
import { isLoginAtom, userInfoAtom } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  min-height: 101vh;
`;
const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const Header = styled.h2`
  margin: 0 0 1rem 0;
  font-family: "Noto Sans KR";
  font-weight: 500;
`;
const UpdateForm = styled.form`
  width: 100%;
  height: 500px;
`;
const Input = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 8px 10px;
  margin-bottom: 0.5rem;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 20%) 0px 0px 0px 1px inset;
  background: ${(props) => props.theme.inputColor};
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  border: none;
  outline: none;
`;
const Label = styled.label`
  color: ${(props) => props.theme.subTextColor};
  font-size: 12px;
  font-family: "Noto Sans KR", sans-serif;
`;
const EditBtn = styled.button`
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :hover {
    background-color: #525e66;
  }
`;
const ErrorMessageArea = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1rem;
  color: ${(props) => props.theme.redTextColor};
`;

type FormData = {
  username: string;
  password: string;
  email: string;
};

function UserInfo() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const setUser = useSetRecoilState(userInfoAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    // if token doesn't exist or is empty string, let client login
    if (!isLogin) {
      navigate("/");
    }
    if (!userInfo) {
      const { token }: any = JSON.parse(localStorage.getItem("token")!);
      axios
        .get(API_URL + "/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response: AxiosResponse) {
          setUser(response.data);
        })
        .catch((error: any) => {
          console.log("error at /user/me", error);
        });
    }
  });

  const onValid = (data: FormData) => {
    console.log(data);
    const { token }: any = JSON.parse(localStorage.getItem("token")!);
    axios
      .put(
        API_URL + `/users/${userInfo?.username}`,
        { ...data, username: userInfo?.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return userInfo ? (
    <Wrapper>
      <Container>
        <Header>프로필 수정하기</Header>
        <UpdateForm onSubmit={handleSubmit(onValid)}>
          <Label>이름</Label>
          <Input placeholder={userInfo?.username || ""} readOnly />
          <Label>이메일</Label>
          <Input
            {...register("email", {
              required: "이메일를 입력해주세요.",
              minLength: { value: 5, message: "이메일 너무 짧습니다" },
              maxLength: { value: 20, message: "이메일 너무 깁니다" },
              pattern: {
                value: /^[A-Za-z0-9].{5,20}$/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            placeholder={userInfo?.email || ""}
          />
          <Label>성별</Label>
          <Input
            placeholder={userInfo?.gender === 0 ? "여성" : "남성" || ""}
            readOnly
          />

          <Label>비밀번호</Label>
          <Input
            {...register("password", {
              required: "This is Required",
            })}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          <EditBtn>수정하기</EditBtn>

          {errors.username ? (
            <ErrorMessageArea>{errors.username.message}</ErrorMessageArea>
          ) : errors.email ? (
            <ErrorMessageArea>{errors.email.message}</ErrorMessageArea>
          ) : null}
        </UpdateForm>
      </Container>
    </Wrapper>
  ) : null;
}

export default React.memo(UserInfo);
