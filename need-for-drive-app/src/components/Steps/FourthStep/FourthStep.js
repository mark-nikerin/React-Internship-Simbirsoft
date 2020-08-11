import React from "react";
import "./fourthStep.css";
import "../steps.css";
import carImage from "../../../assets/cars/6.png";

const FourthStep = () => {
  return (
    <div className="step"> 
      <div className="selected-car">
        <div className="selected-car__info">
          <h1 className="info__title">Hyndai, i30 N</h1>
          <div className="info__number">K 761 HA 73</div>
          <div className="info__item">
            <h3>Топливо</h3>
            <span>100%</span>
          </div>
          <div className="info__item">
            <h3>Доступна с</h3>
            <span>12.06.2019 12:00</span>
          </div>
        </div>
        <img
          className="selected-car__image"
          src={`${carImage}`}
          alt="car"
        ></img>
      </div>
    </div>
  );
};

export default FourthStep;
