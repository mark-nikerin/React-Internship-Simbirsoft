import React from "react";
import _ from "lodash";
import Autocomplete from "./Autocomplete";
import map from "../../../assets/map.png";
import "./firstStep.css";
import "../steps.css";
import "./Autocomplete/autocomplete.css";

let inputInfo = { city: "", point: "" };

let locationInfo = { title: "Пункт выдачи", value: "" };

const API_KEY = process.env.REACT_APP_API_KEY;

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

  const getCitySuggestions = async () => {
    const response = await fetch(
      "https://api-factory.simbirsoft1.com/api/db/city",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const cities = await response.json();
    const suggestions = cities.data.map((city) => {
      return city.name;
    });
    return suggestions;
  };

  const getPointSuggestions = async () => {
    const response = await fetch(
      "https://api-factory.simbirsoft1.com/api/db/point",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const points = await response.json();
    const suggestions = points.data
      .filter((point) => {
        return point.cityId.name === cityValue;
      })
      .map((point) => {
        return point.name + ", " + point.address;
      });
    return suggestions;
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
            onFetchSuggestions={getCitySuggestions}
          />
        </div>
        <div className="search__item">
          <h3>Пункт выдачи</h3>
          <Autocomplete
            onValueChange={onPointChange}
            onInputBlur={onPointBlur}
            value={pointValue}
            placeholder={"Начните вводить пункт ..."}
            onFetchSuggestions={getPointSuggestions}
          />
        </div>
      </div>
      <h3 className="map-title">Выбрать на карте:</h3>
      <img className="map" src={`${map}`} alt="Карта"></img>
    </div>
  );
};

export default FirstStep;
