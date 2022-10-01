import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
`;
const LogoImg = styled.img`
  width: 50px;
`;
const LogoTitle = styled.div`
  font-family: "RocknRoll One", sans-serif;
  margin-left: 15px;
  font-size: 1.75rem;
  line-height: 1.8rem;
  letter-spacing: 0.1em;
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoImg src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f373.svg" />
      <LogoTitle>
        Egg
        <br />
        Talk
      </LogoTitle>
    </LogoContainer>
  );
}

export default React.memo(Logo);
