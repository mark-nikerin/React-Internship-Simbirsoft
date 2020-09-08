import React from "react";
import Autocomplete from "./Autocomplete";
import map from "../../../assets/map.png";
import "./locationStep.css";
import "../steps.css";
import "./Autocomplete/autocomplete.css";

let inputInfo = { city: "", point: "" };

let locationInfo = { title: "Пункт выдачи", value: "" };

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const LocationStep = ({props}) => {
  const onCityChange = (value) => {
    props.setField("city", { id: value.id, name: value.name});
  };

  const onPointChange = (value) => {
    props.setField("point", { id: value.id, name: value.name});
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
        props.addInfoItem(locationInfo.title, locationInfo.value);
      }
    }
  };



  const getCitySuggestions = async () => {
    const response = await fetch(PROXY_URL +
      "http://api-factory.simbirsoft1.com/api/db/city",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const cities = await response.json();
    const suggestions = cities.data.map((city) => {
      return { id: city.id, name: city.name };
    });
    return suggestions;
  };

  const getPointSuggestions = async () => {
    const response = await fetch(PROXY_URL +
      "http://api-factory.simbirsoft1.com/api/db/point",
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
        return { id: point.id, name: point.name + ", " + point.address };
      });
    return suggestions;
  };

  const cityValue = props.fieldValues.city.name;
  const pointValue = props.fieldValues.point.name;

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

export default LocationStep;
