import React from "react";
import Header from "../components/Header";
import StepsMenu from "../components/StepsMenu";
import OrderInfo from "../components/OrderInfo";
import Steps from "../components/Steps";

import { connect } from "react-redux";
import {
  setNextStep,
  setPrevStep,
  setStep,
  setField,
  resetFields,
} from "../store/order/steps/actions";
import {
  addInfoItem,
  removeInfoItem,
  resetInfoItems,
  setOrderPrice
} from "../store/order/orderInfo/actions";

import "./order.css";

const OrderPage = (props) => {
  const orderId = props.match.params.id;
  const currentStep = orderId === undefined ? props.currentStep : 6;

  return (
    <div className="order-page">
      <Header />
      <StepsMenu
        currentStep={currentStep}
        setStep={props.setStep}
        filledSteps={props.filledSteps}
        orderId={orderId}
      />
      <div className="steps-body">
        <Steps
          currentStep={currentStep}
          setPrevStep={props.setPrevStep}
          setNextStep={props.setNextStep}
          addInfoItem={props.addInfoItem}
          removeInfoItem={props.removeInfoItem}
          setField={props.setField}
          fieldValues={props.fieldValues}
          setOrderPrice={props.setOrderPrice}
          orderPrice ={props.orderPrice}
          resetFields={props.resetFields}
          resetInfoItems={props.resetInfoItems}
          orderId={orderId}
        />
        <OrderInfo
          currentStep={currentStep}
          setNextStep={props.setNextStep}
          setStep={props.setStep}
          infoItems={props.infoItems}
          filledSteps={props.filledSteps}
          resetFields={props.resetFields}
          resetInfoItems={props.resetInfoItems}
          orderPrice={props.orderPrice}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentStep: state.steps.currentStep,
    filledSteps: state.steps.filledSteps,
    fieldValues: state.steps.fieldValues,
    infoItems: state.orderInfo.infoItems,
    orderPrice: state.orderInfo.orderPrice
  };
};

const mapDispatchToProps = {
  setNextStep,
  setPrevStep,
  setStep,
  addInfoItem,
  removeInfoItem,
  setField,
  resetFields,
  resetInfoItems,
  setOrderPrice
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
