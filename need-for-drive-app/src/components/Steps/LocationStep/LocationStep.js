import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Autocomplete from "./Autocomplete";
import "./locationStep.css";
import "../steps.css";
import "./Autocomplete/autocomplete.css";

let inputInfo = { city: "", point: "" };

let locationInfo = { title: "Пункт выдачи", value: "" };

const cache = { cities: null, points: null, cityMarks: null, pointMarks: null };

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;
const YMAPS_API_KEY = "c27f119f-4abb-4015-8b10-6fbe8c74a51c";

const LocationStep = ({ props }) => {
  const [cities, setCities] = React.useState([]);
  const [points, setPoints] = React.useState([]);

  const [cityMarks, setCityMarks] = React.useState([]);
  const [pointMarks, setPointMarks] = React.useState([]);

  const cityValue = props.fieldValues.city.name;
  const pointValue = props.fieldValues.point.name;

  const onCityChange = (value) => {
    props.setField("city", { id: value.id, name: value.name });
  };

  const onPointChange = (value) => {
    props.setField("point", { id: value.id, name: value.name });
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

  React.useEffect(() => {
    const getPlace = async (query) => {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x?apikey=${YMAPS_API_KEY}&geocode=${query}&format=json`
      );
      const json = await response.json();
      return json.response.GeoObjectCollection.featureMember[0].GeoObject;
    };

    let pointMarks = [];
    points.forEach(async (point) => {
      const x = await getPlace(point.cityName + "," + point.address);
      pointMarks.push({ ...x, pointId: point.id, cityName: point.cityName });
    });
    cache["pointMarks"] = pointMarks;
    setPointMarks(pointMarks);
  }, [points]);

  React.useEffect(() => {
    const getPlace = async (query) => {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x?apikey=${YMAPS_API_KEY}&geocode=${query}&format=json`
      );
      const json = await response.json();
      return json.response.GeoObjectCollection.featureMember[0].GeoObject;
    };

    let cityMarks = [];
    cities.forEach(async (city) => {
      const x = await getPlace(city.name);
      cityMarks.push({ ...x, name: city.name });
    });
    cache["cityMarks"] = cityMarks;
    setCityMarks(cityMarks);
  }, [cities]);

  React.useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch(
        PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/city",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Factory-Application-Id": API_KEY,
          },
        }
      );
      const citiesResponse = await response.json();
      const cities = citiesResponse.data.map((city) => {
        return { id: city.id, name: city.name };
      });
      setCities(cities);
      cache["cities"] = cities;
    };

    const fetchPoints = async () => {
      const response = await fetch(
        PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/point",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Factory-Application-Id": API_KEY,
          },
        }
      );
      const pointsResponse = await response.json();
      const points = pointsResponse.data.map((point) => {
        return {
          id: point.id,
          name: point.name + ", " + point.address,
          cityName: point.cityId.name,
          address: point.address,
        };
      });
      setPoints(points);
      cache["points"] = points;
    };

    if (cache["cities"] === null) {
      fetchCities();
    } else {
      setCities(cache["cities"]);
    }

    if (cache["points"] === null) {
      fetchPoints();
    } else {
      setPoints(cache["points"]);
    }
  }, []);

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
            suggestions={cities}
          />
        </div>
        <div className="search__item">
          <h3>Пункт выдачи</h3>
          <Autocomplete
            onValueChange={onPointChange}
            onInputBlur={onPointBlur}
            value={pointValue}
            placeholder={"Начните вводить пункт ..."}
            suggestions={points.filter((point) => {
              return point.cityName === cityValue;
            })}
          />
        </div>
      </div>
      <h3 className="map-title">Выбрать на карте:</h3>

      {
        <YMaps
          key={"ymap"}
          query={{
            ns: "use-load-option",
            apikey: YMAPS_API_KEY,
          }}
        >
          <Map
            key={"map"}
            modules={[
              "control.ZoomControl",
              "control.FullscreenControl",
              "geocode",
              "geoObject.addon.hint",
            ]}
            width={400}
            height={400}
            defaultState={{
              center: [55.75, 37.57],
              zoom: 4,
              controls: ["zoomControl", "fullscreenControl"],
            }}
          >
            {cityMarks
              .filter((mark) =>
                cityValue === "" ? true : mark.name === cityValue
              )
              .map((mark) => {
                return (
                  <Placemark
                    key={mark.Point.pos}
                    geometry={[
                      ...mark.Point.pos
                        .split(" ", 2)
                        .reverse()
                        .map((x) => parseFloat(x)),
                    ]}
                    options={{
                      preset: "islands#circleIcon",
                      iconColor: "#3caa3c",
                    }}
                    properties={{ hintContent: mark.name }}
                  />
                );
              })}
            {pointMarks
              .filter((mark) =>
                cityValue === "" ? true : mark.cityName === cityValue
              )
              .map((mark) => (
                <Placemark
                  key={mark.Point.pos}
                  geometry={[
                    ...mark.Point.pos
                      .split(" ", 2)
                      .reverse()
                      .map((x) => parseFloat(x)),
                  ]}
                  options={{
                    preset: "islands#circleIcon",
                    iconColor: "#000000",
                  }}
                  properties={{ hintContent: mark.name }}
                />
              ))}
          </Map>
        </YMaps>
      }
    </div>
  );
};

export default LocationStep;
