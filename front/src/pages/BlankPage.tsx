import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 32px;
`;

function BlankPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);

  useEffect(() => {
    // if token doesn't exist or is empty string, let client login
    if (!isLogin) {
      navigate("../");
      return;
    }
  }, [isLogin, navigate]);

  return isLogin ? <Wrapper></Wrapper> : null;
}

export default React.memo(BlankPage);
