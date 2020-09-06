import React from "react";
import { Redirect } from "react-router-dom";
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
            fieldValues={props.fieldValues}
          />
        );
      case 5:
        return (
          <>
            <FinalStep
              setOrderPrice={props.setOrderPrice}
              orderPrice={props.orderPrice}
              fieldValues={props.fieldValues}
            />
            <ConfirmOrder
              setNextStep={props.setNextStep}
              setPrevStep={props.setPrevStep}
              order={props.fieldValues}
              price={props.orderPrice}
              resetFields={props.resetFields}
              resetInfoItems={props.resetInfoItems}
            />
          </>
        );
      case 6:
        return <Redirect to="/order/:id" />
      default:
        return <LocationStep props={stepProps} />;
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
