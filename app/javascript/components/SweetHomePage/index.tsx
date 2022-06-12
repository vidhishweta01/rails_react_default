import React from "react";
import { observer } from "mobx-react-lite";
import SweetHomeUI from "./SweetHomeUI";
import { PageContainer, SugarMessageContainer } from "./uiComponents";

type Props = {};

const BigRedButton: React.FC<Props> = observer(() => {
  const { sugarCounter, isVerySweet, incrementSugarCounter } = SweetHomeUI;

  return (
    <PageContainer>
      {!isVerySweet && (
        <SugarMessageContainer>
          <span>This home doesn't seem to be sweet enough 🤔</span>
          <span>{sugarCounter} has been added</span>
          <button onClick={incrementSugarCounter}>Add some sugar 🍦</button>
        </SugarMessageContainer>
      )}

      {isVerySweet && (
        <SugarMessageContainer>
          <span>Woo this home is very sweet now! 🏡🍦</span>
          <span>{sugarCounter} has been added</span>
          <button onClick={incrementSugarCounter}>Add even some sugar!</button>
        </SugarMessageContainer>
      )}
    </PageContainer>
  );
});

export default BigRedButton;
