import React from "react";
import "../steps.css";
import "./secondStep.css";
import firstCar from "../../../assets/cars/1.png";
import secondCar from "../../../assets/cars/2.png";
import thirdCar from "../../../assets/cars/3.png";
import fourthCar from "../../../assets/cars/4.png";
import fifthCar from "../../../assets/cars/5.png";
import sixthCar from "../../../assets/cars/6.png";

const SecondStep = () => {
  return (
    <div className="step">
      <div className="filters">
        <label className="checked">
          <input type="radio" name="model" defaultChecked="true"></input>Все
          модели
        </label>
        <label>
          <input type="radio" name="model"></input>Эконом
        </label>
        <label>
          <input type="radio" name="model"></input>Премиум
        </label>
      </div>
      <div className="cars">
        <div className="cars__item">
          <div className="title">
            <h3>ELANTRA</h3>
            <span>12 000 - 25 000 ₽</span>
          </div>
          <img src={`${firstCar}`} alt="firstCar"></img>
        </div>
        <div className="cars__item">
          <div className="title">
            <h3>i30 N</h3>
            <span>10 000 - 32 000 ₽</span>
          </div>
          <img src={`${secondCar}`} alt="secondCar"></img>
        </div>
        <div className="cars__item">
          <div className="title">
            <h3>CRETA</h3>
            <span>12 000 - 25 000 ₽</span>
          </div>
          <img src={`${thirdCar}`} alt="thirdCar"></img>
        </div>
        <div className="cars__item selected">
          <div className="title">
            <h3>SONATA</h3>
            <span>10 000 - 32 000 ₽</span>
          </div>
          <img src={`${fourthCar}`} alt="fourthCar"></img>
        </div>
        <div className="cars__item">
          <div className="title">
            <h3>i30 N</h3>
            <span>10 000 - 32 000 ₽</span>
          </div>
          <img src={`${fifthCar}`} alt="fifthCar"></img>
        </div>
        <div className="cars__item">
          <div className="title">
            <h3>ELANTRA</h3>
            <span>12 000 - 25 000 ₽</span>
          </div>
          <img src={`${sixthCar}`} alt="sixthCar"></img>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
