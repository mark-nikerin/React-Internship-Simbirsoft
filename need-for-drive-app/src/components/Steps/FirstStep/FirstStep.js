import React from "react";
import _ from "lodash";
import Autocomplete from "./Autocomplete";
import map from "../../../assets/map.png";
import "./firstStep.css";
import "../steps.css";
import "./Autocomplete/autocomplete.css";

let inputInfo = { city: "", point: "" };

let locationInfo = { title: "Пункт выдачи", value: "" };

const FirstStep = (props) => {
  const onCityChange = (value) => {
    props.setField("city", value);
  };

  const onPointChange = (value) => {
    props.setField("point", value);
  };

  const onCityBlur = (value) => {
    if (value === "") {
      props.removeInfoItem(locationInfo.title);
    } else inputInfo.city = value;
  };

  const onPointBlur = (value) => {
    if (value === "") {
      props.removeInfoItem(locationInfo.title);
    } else {
      inputInfo.point = value;
      let newLocationInfoValue = inputInfo.city + ",   " + inputInfo.point;

      if (locationInfo.value !== newLocationInfoValue) {
        locationInfo.value = newLocationInfoValue;
        props.addInfoItem(locationInfo);
      }
    }
  };

  const getCities = async () => {
    const response = await fetch(
      "http://api-factory.simbirsoft1.com/api/db/city",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
        },
      }
    );
    const cities = await response.json();
    console.log(cities);
    return cities.data;
  };

  const getPoints = async () => {
    const response = await fetch(
      "http://api-factory.simbirsoft1.com/api/db/point",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
        },
      }
    );
    const points = await response.json();
    console.log(points);
    return points.data;
  };

  const cityValue = _.find(props.fieldValues, { field: "city" }).value;
  const pointValue = _.find(props.fieldValues, { field: "point" }).value;

  return (
    <div className="step">
      <div className="search">
        <div className="search__item">
          <h3>Город</h3>
          <Autocomplete
            onValueChange={onCityChange}
            onInputBlur={onCityBlur}
            value={cityValue}
            placeholder={"Начните вводить город ..."}
            onFetchSuggestions={getCities}
          />
        </div>
        <div className="search__item">
          <h3>Пункт выдачи</h3>
          <Autocomplete
            onValueChange={onPointChange}
            onInputBlur={onPointBlur}
            value={pointValue}
            placeholder={"Начните вводить пункт ..."}
            onFetchSuggestions={getPoints}
          />
        </div>
      </div>
      <h3 className="map-title">Выбрать на карте:</h3>
      <img className="map" src={`${map}`} alt="Карта"></img>
    </div>
  );
};

export default FirstStep;
