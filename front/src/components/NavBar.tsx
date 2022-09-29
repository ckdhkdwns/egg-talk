import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background: linear-gradient(#00000022 0%, #0000001a 35%, transparent 100%);
`;

const LogoWrapper = styled.a`
  display: flex;
  justify-items: center;
  align-items: center;
  height: 100%;
  margin: 0 15px;
  padding: 10px;
  cursor: pointer;
`;

const LogoTitle = styled.div`
  margin-left: 15px;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 26px;
  letter-spacing: 1px;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
`;
const NavItem = styled.li`
  margin: 0 10px;
  padding: 10px;
  font-family: "Noto Serif", serif;
  text-align: center;
  cursor: pointer;
`;

function NavBar() {
  return (
    <Container>
      <div style={{ display: "flex", margin: "0 auto" }}>
        <LogoWrapper href="/">
          <Logo width="45" height="45" />
          <LogoTitle>
            Egg
            <br />
            Talk
          </LogoTitle>
        </LogoWrapper>
        <NavItems>
          <NavItem>
            <a href="/">ABOUT US</a>
          </NavItem>
          <NavItem>
            <a href="/">CHAT</a>
          </NavItem>
          <NavItem>
            <a href="/">LOG IN</a>
          </NavItem>
        </NavItems>
      </div>
    </Container>
  );
}

export default NavBar;
