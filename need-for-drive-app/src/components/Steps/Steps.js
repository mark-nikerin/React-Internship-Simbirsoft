import React from "react";
import LocationStep from "./LocationStep";
import CarModelsStep from "./CarModelsStep";
import AdditionalsStep from "./AdditionalsStep";
import FinalStep from "./FinalStep";
import ConfirmOrder from "./ConfirmOrder";

const Steps = (props) => {
  const stepProps = {
    addInfoItem: props.addInfoItem,
    removeInfoItem: props.removeInfoItem,
    setField: props.setField,
    fieldValues: props.fieldValues,
  };

  const switchSteps = (currentStep) => {
    switch (currentStep) {
      case 1:
        return <LocationStep props={stepProps} />;
      case 2:
        return <CarModelsStep props={stepProps} />;
      case 3:
        return <AdditionalsStep props={stepProps} />;
      case 4:
        return <FinalStep />;
      case 5:
        return (
          <>
            <FinalStep />
            <ConfirmOrder
              setNextStep={props.setNextStep}
              setPrevStep={props.setPrevStep}
            />
          </>
        );
      case 6:
        return <FinalStep />;
      default:
        return <LocationStep props={stepProps} />;
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
