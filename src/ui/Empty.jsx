import PropTypes from "prop-types";
import styled from "styled-components";
const StyledEmpty = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  padding: 10rem;
`;
function Empty({ resource }) {
  return <StyledEmpty>No {resource} could be found.</StyledEmpty>;
}

Empty.propTypes = {
  resource: PropTypes.string,
};

export default Empty;
