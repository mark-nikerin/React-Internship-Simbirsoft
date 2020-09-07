import React from "react";
import LocationStep from "./LocationStep";
import CarModelsStep from "./CarModelsStep";
import AdditionalsStep from "./AdditionalsStep";
import FinalStep from "./FinalStep";
import ConfirmOrder from "./ConfirmOrder";
import moment from "moment";

const getDateDiff = (dateStart, dateEnd) => {
  const amountMinutes = Math.abs(
    moment(dateStart).diff(moment(dateEnd), "minutes")
  );

  const amountHours = Math.floor(amountMinutes / 60);
  const remainingMinutes = amountMinutes % 60;

  const amountDays = Math.floor(amountHours / 24);
  const remainingHours = amountHours % 24;

  return { days: amountDays, hours: remainingHours, minutes: remainingMinutes };
};

const getOrderPrice = (unit, unitPrice, dateDiff, minPrice, additionals) => {
  let price = minPrice;

  price +=
    unit === "мин"
      ? ((dateDiff.days * 24 + dateDiff.hours) * 60 + dateDiff.minutes) *
        unitPrice
      : dateDiff.days === 0
      ? unitPrice
      : dateDiff.hours === 0 && dateDiff.minutes === 0
      ? dateDiff.days * unitPrice
      : (dateDiff.days + 1) * unitPrice;

  additionals.forEach((additional) => {
        if (additional.isActive) {
          price += additional.price;
        }});

  return price;
};

const Steps = (props) => {
  const stepProps = {
    addInfoItem: props.addInfoItem,
    removeInfoItem: props.removeInfoItem,
    setField: props.setField,
    fieldValues: props.fieldValues,
    setOrderPrice: props.setOrderPrice,
    orderPrice: props.orderPrice,
    getDateDiff: getDateDiff,
    getOrderPrice: getOrderPrice
  };

  const orderId = props.orderId;
  console.log("steps - " + orderId);

  const switchSteps = (currentStep) => {
    switch (currentStep) {
      case 1:
        return <LocationStep props={stepProps} />;
      case 2:
        return <CarModelsStep props={stepProps} />;
      case 3:
        return <AdditionalsStep props={stepProps} />;
      case 4:
        return <FinalStep props={stepProps} orderId={orderId} />;
      case 5:
        return (
          <>
            <FinalStep props={stepProps} orderId={orderId} />
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
        return <FinalStep props={stepProps} orderId={orderId} />;
      default:
        return <LocationStep props={stepProps} />;
    }
  };

  return switchSteps(props.currentStep);
};

export default Steps;
