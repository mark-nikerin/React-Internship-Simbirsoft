import React from "react";
import Header from "../components/Header";
import StepsMenu from "../components/StepsMenu";
import OrderInfo from "../components/OrderInfo";
import Steps from "../components/Steps";

import { connect } from "react-redux"; 
import { setNextStep, setPrevStep, setStep } from "../store/order/actions";
  
import "./order.css";
 

const OrderPage = (props) => {
  return (
    <div className="order-page">
      <Header />
      <StepsMenu currentStep={props.currentStep} setStep={props.setStep}/>
      <div className="steps-body">
        <Steps currentStep={props.currentStep} setPrevStep={props.setPrevStep} setNextStep={props.setNextStep}/>
        <OrderInfo currentStep={props.currentStep} setNextStep={props.setNextStep} setStep={props.setStep} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentStep: state.order.currentStep,
    filledSteps: state.order.filledSteps,
  };
};

const mapDispatchToProps = {
  setNextStep,
  setPrevStep,
  setStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
