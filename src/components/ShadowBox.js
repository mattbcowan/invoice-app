import styled from "styled-components";

const ShadowBox = styled.div`
  box-sizing: border-box;
  min-width: 0;
  background: #ffffff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: ${({ theme }) => theme.radii[2]};
  padding: 2em;
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
`;

export default ShadowBox;
