import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  min-height: 101vh;
`;
const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const MyProfile = styled.h2`
  margin: 0 0 3rem 0;
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

/* const user = {
  authorityDtoSet: [],
  userId: "juyeolyoon",
  username: "juyeolyoon",
  email: "juyeolyoon@gmail.com",
  gender: 0,
}; */

type userData = {
  authorityDtoSet: [];
  userId: string;
  username: string;
  email: string;
  gender: number;
} | null;

type FormData = {
  username: string;
  email: string;
};

function UserInfo() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const [user, setUser] = useState<userData>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // 주분싸 테스트

  axios
    .get(
      "https://raw.githubusercontent.com/RJ-Stony/JuBoonSSa/996719ac79dacc3bad566008aa7d8c99e57123cb/sam_stock.json"
    )
    .then(function (response: AxiosResponse) {
      console.log(response);
    })
    .catch((error: any) => {
      console.log("error:", error);
    });

  useEffect(() => {
    // if token doesn't exist or is empty string, let client login
    if (!isLogin) {
      navigate("/");
      return;
    }
    const { token }: any = JSON.parse(localStorage.getItem("token")!);
    axios
      .get("https://egg-talk-server.run.goorm.io/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response: AxiosResponse) {
        setUser(response.data);
        // console.log(response);
      })
      .catch((error: any) => {
        console.log("error:", error);
      });
  }, [isLogin, navigate]);

  const onValid = (data: FormData) => {
    console.log(data);
  };

  return isLogin ? (
    <Wrapper>
      <Container>
        <MyProfile>내 프로필</MyProfile>
        <UpdateForm onSubmit={handleSubmit(onValid)}>
          <Label>이름</Label>
          <Input
            {...register("username", {
              required: "이름을 입력해주세요.",
              maxLength: { value: 15, message: "이름이 너무 깁니다" },
            })}
            value={user?.username || ""}
          />
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
            value={user?.email || ""}
          />
          <Label>성별</Label>
          <Input value={user?.gender === 0 ? "남성" : "여성" || ""} readOnly />
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
