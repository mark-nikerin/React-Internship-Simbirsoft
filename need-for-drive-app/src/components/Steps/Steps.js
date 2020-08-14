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
        return (
          <FirstStep
            addInfoItem={props.addInfoItem}
            removeInfoItem={props.removeInfoItem}
            setField={props.setField}
            fieldValues={props.fieldValues}
          />
        );
      case 2:
        return (
          <SecondStep
            addInfoItem={props.addInfoItem}
            removeInfoItem={props.removeInfoItem}
            setField={props.setField}
            fieldValues={props.fieldValues}
          />
        );
      case 3:
        return (
          <ThirdStep
            addInfoItem={props.addInfoItem}
            removeInfoItem={props.removeInfoItem}
            setField={props.setField}
            fieldValues={props.fieldValues}
          />
        );
      case 4:
        return (
          <FourthStep
            addInfoItem={props.addInfoItem}
            removeInfoItem={props.removeInfoItem}
            setField={props.setField}
            fieldValues={props.fieldValues}
          />
        );
      case 5:
        return (
          <>
            <FourthStep />
            <ConfirmOrder
              setNextStep={props.setNextStep}
              setPrevStep={props.setPrevStep}
            />
          </>
        );
      case 6:
        return (
          <FourthStep
            addInfoItem={props.addInfoItem}
            removeInfoItem={props.removeInfoItem}
            setField={props.setField}
            fieldValues={props.fieldValues}
          />
        );
      default:
        return (
          <FirstStep
            addInfoItem={props.addInfoItem}
            removeInfoItem={props.removeInfoItem}
            setField={props.setField}
            fieldValues={props.fieldValues}
          />
        );
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
