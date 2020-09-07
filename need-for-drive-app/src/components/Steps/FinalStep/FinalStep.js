import React from "react";
import "./finalStep.css";
import "../steps.css";

const FinalStep = (props) => {
  const selectedCar = props.fieldValues.selectedCar;

  return (
    <div className="step">
      <div className="selected-car">
        <div className="selected-car__info">
          <h1 className="info__title">{selectedCar.model}</h1>
          <div className="info__number">{selectedCar.number}</div>
          <div className="info__item">
            <h3>Топливо</h3>
            <span>{selectedCar.tank + " %"}</span>
          </div>
          <div className="info__item">
            <h3>Доступна с</h3>
            <span>{props.fieldValues.dateStart.formatted}</span>
          </div>
        </div>
        <img
          className="selected-car__image"
          crossOrigin="anonymous"
          referrerPolicy="origin"
          src={selectedCar.imgUrl}
          alt="car"
        ></img>
      </div>
    </div>
  );
};

export default FinalStep;
