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
} from "../store/order/steps/actions";
import { addInfoItem, removeInfoItem } from "../store/order/orderInfo/actions";

import "./order.css";

const OrderPage = (props) => {
  return (
    <div className="order-page">
      <Header />
      <StepsMenu currentStep={props.currentStep} setStep={props.setStep} />
      <div className="steps-body">
        <Steps
          currentStep={props.currentStep}
          setPrevStep={props.setPrevStep}
          setNextStep={props.setNextStep}
          addInfoItem={props.addInfoItem}
          removeInfoItem={props.removeInfoItem}
        />
        <OrderInfo
          currentStep={props.currentStep}
          setNextStep={props.setNextStep}
          setStep={props.setStep}
          infoItems={props.infoItems}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentStep: state.steps.currentStep,
    filledSteps: state.steps.filledSteps,
    infoItems: state.orderInfo.infoItems,
  };
};

const mapDispatchToProps = {
  setNextStep,
  setPrevStep,
  setStep,
  addInfoItem,
  removeInfoItem
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
