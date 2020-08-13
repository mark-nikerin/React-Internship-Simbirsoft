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
        return <FirstStep addInfoItem={props.addInfoItem} removeInfoItem={props.removeInfoItem}/>;
      case 2:
        return <SecondStep addInfoItem={props.addInfoItem} removeInfoItem={props.removeInfoItem}/>;
      case 3:
        return <ThirdStep addInfoItem={props.addInfoItem} removeInfoItem={props.removeInfoItem}/>;
      case 4:
        return <FourthStep addInfoItem={props.addInfoItem} removeInfoItem={props.removeInfoItem}/>;
      case 5:
        return (
          <>
            <FourthStep />
            <ConfirmOrder setNextStep={props.setNextStep} setPrevStep={props.setPrevStep}/>
          </>
        );
      case 6:
        return <FourthStep addInfoItem={props.addInfoItem} removeInfoItem={props.removeInfoItem}/>
      default:
        return <FirstStep addInfoItem={props.addInfoItem} removeInfoItem={props.removeInfoItem}/>;
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
