import React from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import ConfirmOrder from "./ConfirmOrder";

const Steps = (props) => {
  const switchSteps = (currentStep) => {
    switch (currentStep) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FourthStep />;
      case 5:
        return (
          <>
            <FourthStep />
            <ConfirmOrder setNextStep={props.setNextStep} setPrevStep={props.setPrevStep}/>
          </>
        );
      case 6:
        return <FourthStep />
      default:
        return <FirstStep />;
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
