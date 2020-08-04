import React from "react";
import Header from "../components/Header";
import StepsMenu from "../components/StepsMenu";
import OrderInfo from "../components/OrderInfo";
import { FirstStep, SecondStep, ThirdStep, FourthStep } from "../components/Steps"
import "./order.css";

const OrderPage = () => {
  return (
    <div className="order-page">
      <Header />
      <StepsMenu />
      <div className="steps-body">  
        <FourthStep /> 
        <OrderInfo />
      </div> 
    </div>
  );
}

export default OrderPage;