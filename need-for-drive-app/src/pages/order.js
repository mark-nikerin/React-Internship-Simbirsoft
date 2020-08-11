import React from "react";
import Header from "../components/Header";
import StepsMenu from "../components/StepsMenu";
import OrderInfo from "../components/OrderInfo";
import Steps from "../components/Steps";

import { connect } from "react-redux"; 
import { setNextStep, setPrevStep } from "../store/order/actions";
  
import "./order.css";
 

const OrderPage = (props) => {
  return (
    <div className="order-page">
      <Header />
      <StepsMenu currentStep={props.currentStep} setPrevStep={props.setPrevStep}/>
      <div className="steps-body">
        <Steps currentStep={props.currentStep} />
        <OrderInfo currentStep={props.currentStep} setNextStep={props.setNextStep} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
