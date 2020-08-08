import React from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";

const Steps = () => {
   
    
  const switchSteps = () => {
    console.log(2);
    switch(2) {
      case 1:
        return <FirstStep/>;
      case 2:
        return <SecondStep/>;
      case 3:
        return <ThirdStep/>;
      case 4:
        return <FourthStep/>;
      default:
        return <FirstStep/>;
    } 
  }

  return(   
    switchSteps(2) 
  );
}

export default Steps;