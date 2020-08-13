import React from "react";
import "./firstStep.css";
import "../steps.css";
import map from "../../../assets/map.png";

let inputInfo = { city: "", point: "" };

let locationInfo = { title: "Пункт выдачи", value: "" };

const FirstStep = (props) => {
  const onCityChange = (event, value) => {
    event.preventDefault();
    if (value === "") {
      props.removeInfoItem(locationInfo.title);
    } else inputInfo.city = value;
  };

  const onPointChange = (event, value) => {
    event.preventDefault();
    if (value === "") {
      props.removeInfoItem(locationInfo.title);
    } else {
      inputInfo.point = value;
      let newLocationInfoValue = inputInfo.city + "," + inputInfo.point;

      if (locationInfo.value !== newLocationInfoValue) {
        locationInfo.value = newLocationInfoValue;
        props.addInfoItem(locationInfo);
      }
    }
  };

  return (
    <div className="step">
      <div className="search">
        <div className="search__item">
          <h3>Город</h3>
          <input
            type="search"
            placeholder="Начните вводить город ..."
            onBlur={(event) => onCityChange(event, event.target.value)}
          ></input>
        </div>
        <div className="search__item">
          <h3>Пункт выдачи</h3>
          <input
            type="search"
            placeholder="Начните вводить пункт ..."
            onBlur={(event) => onPointChange(event, event.target.value)}
          ></input>
        </div>
      </div>
      <h3 className="map-title">Выбрать на карте:</h3>
      <img className="map" src={`${map}`} alt="Карта"></img>
    </div>
  );
};

export default FirstStep;
