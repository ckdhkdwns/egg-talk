import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LightIcon } from "../images/light_icon.svg";
import { ReactComponent as DarkIcon } from "../images/dark_icon.svg";
import { ReactComponent as LogoutIcon } from "../images/logout_icon.svg";
import { ReactComponent as UserIcon } from "../images/userinfo_icon.svg";
import { isDarkAtom, isLoginAtom, userInfoAtom } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import { userData } from "../api";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: ${(props) => props.theme.navbarColor};
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  padding: 10px 30px;
  transition: 0.2s background-color, 0.2s color;
  z-index: 1000;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 30px;
`;
const LogoTitle = styled.div`
  font-family: "RocknRoll One", sans-serif;
  color: ${(props) => props.theme.textColor};
  margin-left: 15px;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.1em;
`;
const RightItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.hoverColor};
  }
`;

function Navbar() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const user = useRecoilValue<userData>(userInfoAtom);
  const setUser = useSetRecoilState(userInfoAtom);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const logout = () => {
    localStorage.setItem("token", "");
    setIsLogin(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <Wrapper>
      <Link to={"/chat"}>
        <LogoContainer>
          <LogoImg src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f373.svg" />
          <LogoTitle>
            Egg
            <br />
            Talk
          </LogoTitle>
        </LogoContainer>
      </Link>
      {user && <div>Welcome, {`${user.username}`}</div>}
      <RightItems>
        {isLogin && (
          <>
            <RightItem>
              <UserIcon onClick={() => navigate("/userinfo")} />
            </RightItem>
            <RightItem>
              <LogoutIcon onClick={logout} />
            </RightItem>
          </>
        )}
        {isDark ? (
          <RightItem onClick={toggleTheme}>
            <DarkIcon />
          </RightItem>
        ) : (
          <RightItem onClick={toggleTheme}>
            <LightIcon />
          </RightItem>
        )}
      </RightItems>
    </Wrapper>
  );
}

export default React.memo(Navbar);