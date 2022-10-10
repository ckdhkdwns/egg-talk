import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { ReactComponent as DarkIcon } from "../images/dark_icon.svg";
import { ReactComponent as LightIcon } from "../images/light_icon.svg";

const Wrapper = styled.button<{ isDark: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 7vw;
  bottom: 19px;
  width: 136px;
  height: 44px;
  background: ${(props) => (props.isDark ? "#343638" : "#ffffff")};
  color: ${(props) => (props.isDark ? "#d9d9d9" : "#202020")};
  background-position: -270px -55px;
  background-repeat: no-repeat;
  vertical-align: top;
  cursor: pointer;
  z-index: 100;
  outline: 0;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 53px;

  span {
    font-size: 12px;
    line-height: 16px;
    font-family: "Noto Sans KR";
    margin-left: 5px;
    font-weight: 400;
  }

  svg {
    scale: 0.8;
    fill: ${(props) => (props.isDark ? "#c3c9d2" : "#5f6267")};
  }

  &:hover {
    background: ${(props) => (props.isDark ? "#53575c" : "#404040")};

    span {
      color: #ebebeb;
    }
    svg {
      fill: ${(props) => (props.isDark ? "#00f657" : "#fbe303")};
    }
  }
`;

function DarkmodeBtn() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);

  const handleClick = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <Wrapper isDark={isDark} onClick={handleClick}>
      {!isDark && <DarkIcon />}
      {isDark && <LightIcon />}
      <span>다크모드로 보기</span>
    </Wrapper>
  );
}

export default React.memo(DarkmodeBtn);
