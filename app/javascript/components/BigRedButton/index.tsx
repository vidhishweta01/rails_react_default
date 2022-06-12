import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import BigRedButtonUI from "./BigRedButtonUI";
import { ButtonContainer } from "./uiComponents";

type Props = {
  buttonColor: string;
  buttonText: string;
};

const BigRedButton: React.FC<Props> = observer(
  ({ buttonColor, buttonText }) => {
    const { buttonOnClick, buttonClickCounter } = useMemo(
      () => new BigRedButtonUI(),
      []
    );

    return (
      <ButtonContainer className="big-red-button-component" color={buttonColor}>
        {buttonText} {buttonClickCounter}
        <button onClick={buttonOnClick}>+1</button>
      </ButtonContainer>
    );
  }
);

export default BigRedButton;
