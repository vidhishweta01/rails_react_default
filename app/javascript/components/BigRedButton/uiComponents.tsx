import styled from "styled-components";
import SuperQuery from "@themgoncalves/super-query";

export const ButtonContainer = styled.div`
  padding: 1em;
  width: fit-content;
  ${({ color }) => `background-color: ${color};`};

  ${SuperQuery().maxWidth.sm.css`
    font-weight: bold;
  `};
`;
