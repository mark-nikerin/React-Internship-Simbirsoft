import React, { useEffect, useState } from "react";
import "../steps.css";
import "./additionalsStep.css";
import moment from "moment";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const cache = { rates: null }

const getDateDiff = (dateStart, dateEnd) => {
  const amountMinutes = Math.abs(
    moment(dateStart).diff(moment(dateEnd), "minutes")
  );

  const amountHours = Math.floor(amountMinutes / 60);
  const remainingMinutes = amountMinutes % 60;

  const amountDays = Math.floor(amountHours / 24);
  const remainingHours = amountHours % 24;

  const days = amountDays === 0 ? "" : amountDays + "д ";
  const hours = remainingHours === 0 ? "" : remainingHours + "ч ";
  const minutes = remainingMinutes === 0 ? "" : remainingMinutes + "м ";

  return days + hours + minutes;
};

const AdditionalsStep = ({ props }) => {
  const colorFilters = ["Любой", ...props.fieldValues.selectedCar.colors];

  const checkedColorId = props.fieldValues.colorFilter.id;
  const selectedRateId = props.fieldValues.rate.id;
  const additionals = props.fieldValues.additionals;
  const startDate = props.fieldValues.dateStart;
  const endDate = props.fieldValues.dateEnd;

  const [rates, setRates] = useState();

  const fetchRates = async () => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/rate",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const rateResponse = await response.json();
    const rates = rateResponse.data.map((rate) => {
      return {
        id: rate.id,
        price: rate.price,
        unit: rate.rateTypeId.unit,
        name: rate.rateTypeId.name
      };
    });
    setRates(rates);
    cache["rates"] = rates;
  };

  useEffect(() => {
    if (cache["rates"] === null) {
      fetchRates();
    } else {
      setRates(cache["rates"]);
    }
  }, []);

  const onColorCheck = (event, id) => {
    event.preventDefault();
    props.setField("colorFilter", {id: id, name: colorFilters[id] });
    props.addInfoItem({ title: "Цвет", value: colorFilters[id] });
  };

  const onRateSelect = (event, id) => {
    event.preventDefault();
    props.setField("rate", { id:id, rateId:rates[id].id });
    props.addInfoItem({ title: "Тариф", value: rates[id].name });
  };

  const onAdditionalClick = (event, id) => {
    event.preventDefault();
    let newAdditionals = [...additionals];
    newAdditionals[id].isActive =! newAdditionals[id].isActive;

    if (!newAdditionals[id].isActive) {
      props.removeInfoItem(additionals[id].title);
    } else {
      props.addInfoItem({ title: additionals[id].title, value: "Да" });
    }

    props.setField("additionals", newAdditionals);
  };

  const onDateSelect = (start, end) => {
    if (start !== null) {
      props.setField("dateStart", start);
    }

    if (end !== null) {
      props.setField("dateEnd", end);
    }

    if (start !== null && end !== null) {
      props.addInfoItem({
        title: "Длительность аренды",
        value: getDateDiff(start, end),
      });
    }
  };

  return (
    <div className="step">
      <h3 className="step__title">Цвет</h3>
      <div className="filters">
        {colorFilters.map((color, id) => {
          if (id === checkedColorId) {
            return (
              <label
                className="checked"
                key={id}
                onClick={(event) => onColorCheck(event, id)}
              >
                <input type="radio" defaultChecked={true}></input>
                {color}
              </label>
            );
          } else {
            return (
              <label key={id} onClick={(event) => onColorCheck(event, id)}>
                <input type="radio"></input>
                {color}
              </label>
            );
          }
        })}
      </div>
      <h3 className="step__title">Дата аренды</h3>
      <div className="search">
        <div className="search__item">
          <h3>C</h3>
          <input
            type={startDate == null ? "text" : "datetime-local"}
            placeholder="Введите дату и время"
            min={moment(new Date()).format("YYYY-MM-DDTHH:mm")}
            defaultValue={
              startDate == null
                ? null
                : moment(new Date(startDate)).format("YYYY-MM-DDTHH:mm")
            }
            onFocus={(event) => {
              event.preventDefault();
              event.target.type = "datetime-local";
              event.target.max = endDate;
            }}
            onBlur={(event) => {
              event.preventDefault();
              event.target.type = "datetime-local";
              const startDate = moment(event.target.value).format(
                "YYYY-MM-DDTHH:mm"
              );
              onDateSelect(startDate, endDate);
            }}
          ></input>
        </div>
        <div className="search__item">
          <h3>По</h3>
          <input
            type={endDate == null ? "text" : "datetime-local"}
            placeholder="Введите дату и время"
            defaultValue={
              endDate == null
                ? null
                : moment(new Date(endDate)).format("YYYY-MM-DDTHH:mm")
            }
            onFocus={(event) => {
              event.preventDefault();
              event.target.type = "datetime-local";
              event.target.min = startDate;
            }}
            onBlur={(event) => {
              event.preventDefault();
              event.target.type = "datetime-local";
              const endDate = moment(event.target.value).format(
                "YYYY-MM-DDTHH:mm"
              );
              onDateSelect(startDate, endDate);
            }}
          ></input>
        </div>
      </div>
      <h3 className="step__title">Тариф</h3>
      <div className="filters vertical">
        {rates && rates.map((rate, id) => {
          if (id === selectedRateId) {
            return (
              <label
                className="checked"
                key={id}
                onClick={(event) => onRateSelect(event, id)}
              >
                <input type="radio" defaultChecked={true}></input>
                {rate.name + ", " + rate.price + "₽/" + rate.unit}
              </label>
            );
          } else {
            return (
              <label key={id} onClick={(event) => onRateSelect(event, id)}>
                <input type="radio"></input>
                {rate.name + ", " + rate.price + "₽/" + rate.unit}
              </label>
            );
          }
        })}
      </div>
      <h3 className="step__title">Доп. услуги</h3>
      <div className="filters vertical">
        {additionals.map((additional, id) => {
          if (additional.isActive === true) {
            return (
              <label
                className="checked"
                key={id}
                onClick={(event) => onAdditionalClick(event, id)}
              >
                <input type="checkbox" defaultChecked={true}></input>
                {additional.title + ", " + additional.price + additional.unit}
              </label>
            );
          } else {
            return (
              <label key={id} onClick={(event) => onAdditionalClick(event, id)}>
                <input type="checkbox"></input>
                {additional.title + ", " + additional.price + additional.unit}
              </label>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AdditionalsStep;
