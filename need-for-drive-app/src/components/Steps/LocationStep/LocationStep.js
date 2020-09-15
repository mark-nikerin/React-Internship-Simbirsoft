import React from "react";
import { YMaps, Map, Placemark, GeolocationControl } from "react-yandex-maps";
import Autocomplete from "./Autocomplete";
import "./locationStep.css";
import "../steps.css";
import "./Autocomplete/autocomplete.css";

let inputInfo = { city: "", point: "" };

let locationInfo = { title: "Пункт выдачи", value: "" };

const cache = { cities: null, points: null };

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const LocationStep = ({ props }) => {
  const [cities, setCities] = React.useState([]);
  const [points, setPoints] = React.useState([]);

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
      };
    });
    setPoints(points);
    cache["points"] = points;
  };

  const cityValue = props.fieldValues.city.name;
  const pointValue = props.fieldValues.point.name;

  const onLoadMap = (inst) => {
    var location = inst.geocode("Москва");
    console.log("ymaps  ", inst);
    // Асинхронная обработка ответа.
    location.then(
      function (result) {
        // Добавление местоположения на карту.
        console.log("location ", result);
        const coord = result.geoObjects.get(0).geometry.getCoordinates();
        console.log(coord);
        result.geoObjects.options.set("preset", "islands#redCircleIcon");
        result.geoObjects.get(0).properties.set({
          balloonContentBody: "Мое местоположение",
        });
        inst.geoObjects.add(result.geoObjects);
      },
      function (err) {
        console.log("Ошибка: " + err);
      }
    );
  };

  React.useEffect(() => {
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
      <YMaps query={{ lang: 'en_RU' }}>
        <Map
          defaultState={{
            center: [55.75, 37.57],
            zoom: 9,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["control.ZoomControl", "control.FullscreenControl", "geolocation", "geocode"]}
          onLoad={(inst) => onLoadMap(inst)}
          width={430}
          height={430}
        >
          <Placemark
            defaultGeometry={[55.75, 37.57]}
            modules={["geoObject.addon.hint"]}
            properties={{
              hintContent:"Москва",
            }}
            options={{
              preset: 'islands#circleIcon',
              iconColor: '#3caa3c'
            }}
            onClick={(event) => { event.preventDefault(); console.log("Нажатие");}}
          />
          <GeolocationControl options={{ float: 'left' }} />
        </Map>
      </YMaps>
    </div>
  );
};

export default LocationStep;
