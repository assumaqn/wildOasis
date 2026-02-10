import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Link to="/">
        <Img src="/logo-light.png" alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
