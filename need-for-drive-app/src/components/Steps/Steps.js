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
    setOrderPrice: props.setOrderPrice,
    orderPrice: props.orderPrice
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
        return (
          <FinalStep
            setOrderPrice={props.setOrderPrice}
            orderPrice={props.orderPrice}
          />
        );
      case 5:
        return (
          <>
            <FinalStep
              setOrderPrice={props.setOrderPrice}
              orderPrice={props.orderPrice}
            />
            <ConfirmOrder
              setNextStep={props.setNextStep}
              setPrevStep={props.setPrevStep}
            />
          </>
        );
      case 6:
        return <FinalStep
        setOrderPrice={props.setOrderPrice}
        orderPrice={props.orderPrice}
      />;
      default:
        return <LocationStep props={stepProps} />;
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
