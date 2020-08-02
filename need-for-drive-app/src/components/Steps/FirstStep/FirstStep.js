import React from "react";
import "./firstStep.css";
import map from "../../../assets/map.png";

const FirstStep = () => {
  return(
    <div className="first-step">
      <div className="search">
        <div className="search__city">
          <h3>Город</h3>
          <input type="search" placeholder="Начните вводить город ..."></input>
        </div> 
        <div className="search__point">
          <h3>Пункт выдачи</h3>
          <input type="search" placeholder="Начните вводить пункт ..."></input>
        </div>
      </div>
      <h3 className="map-title">Выбрать на карте:</h3>
      <img className="map" src={`${map}`} alt="Карта"></img>
    </div>
  );
}

export default FirstStep;