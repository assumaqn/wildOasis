import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyle";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Heading as="h1">The wild oasis</Heading>
          <div>
            <Heading as="h2">Check in/out</Heading>
            <Button>Check in</Button>
            <Button sizes="small" variations="secondary">
              Check out
            </Button>
          </div>
        </Row>
        <Row type="vertical">
          <Heading as="h3">Form</Heading>
          <div>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="Number of guests" />
          </div>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
