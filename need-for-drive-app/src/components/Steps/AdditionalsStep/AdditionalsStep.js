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

  return { days: amountDays, hours: remainingHours, minutes: remainingMinutes };
};

const AdditionalsStep = ({ props }) => {
  const colorFilters = ["Любой", ...props.fieldValues.selectedCar.colors];

  const checkedColorId = props.fieldValues.colorFilter.id;
  const selectedRateId = props.fieldValues.rate.id;
  const additionals = props.fieldValues.additionals;
  const startDate = props.fieldValues.dateStart.formatted;
  const endDate = props.fieldValues.dateEnd.formatted;
  const orderPrice = props.orderPrice;

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
    props.setField("rate", { id:0, rateId:rates[0].id });
    props.addInfoItem({ title: "Тариф", value: rates[0].name });
    setRates(rates);
    cache["rates"] = rates;
  };

  useEffect(() => {
    if (cache["rates"] === null) {
      fetchRates();
    } else {
      setRates(cache["rates"]);
    };
  }, []);

  const onColorCheck = (event, id) => {
    event.preventDefault();
    props.setField("colorFilter", {id: id, name: colorFilters[id] });
    props.addInfoItem({ title: "Цвет", value: colorFilters[id] });
  };

  const onRateSelect = async (event, id) => {
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
      props.setOrderPrice({ ...orderPrice, final: orderPrice.final - additionals[id].price});
    } else {
      props.addInfoItem({ title: additionals[id].title, value: "Да" });
      props.setOrderPrice({ ...orderPrice, final: orderPrice.final + additionals[id].price});
    }

    props.setField("additionals", newAdditionals);
  };

  const setPrice = (dateDiff) => {
    let price = rates[selectedRateId].unit === "мин"
      ? ((dateDiff.days * 24 + dateDiff.hours) * 60 + dateDiff.minutes) * rates[selectedRateId].price
      : dateDiff.days === 0
        ? rates[selectedRateId].price
        : dateDiff.hours === 0 && dateDiff.minutes === 0
          ? dateDiff.days * rates[selectedRateId].price
          : (dateDiff.days + 1) * rates[selectedRateId].price

    additionals.forEach((additional) => {
      if (additional.isActive) {
        price += additional.price;
      }
      else {
        price -= additional.price;
      }
    });

    props.setOrderPrice({ ...orderPrice, final: orderPrice.min + price});
  }

  const onDateSelect = (start, end) => {
    if (start !== null) {
      props.setField("dateStart", { formatted: start, timespan: new Date(start).valueOf() });
    }

    if (end !== null) {
      props.setField("dateEnd", { formatted: end, timespan: new Date(end).valueOf() });
    }

    if (start !== null && end !== null) {

      const dateDiff = getDateDiff(start, end);

      const days = dateDiff.days === 0 ? "" : dateDiff.days + "д ";
      const hours = dateDiff.hours === 0 ? "" : dateDiff.hours + "ч ";
      const minutes = dateDiff.minutes === 0 ? "" : dateDiff.minutes + "м ";

      setPrice(dateDiff);

      props.addInfoItem({
        title: "Длительность аренды",
        value: days + hours + minutes,
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
                onClick={(event) => {
                  onRateSelect(event, id);
                  setPrice(getDateDiff(startDate, endDate));
                }}
              >
                <input type="radio" defaultChecked={true}></input>
                {rate.name + ", " + rate.price + "₽/" + rate.unit}
              </label>
            );
          } else {
            return (
              <label
                key={id}
                onClick={(event) => {
                  onRateSelect(event, id);
                  setPrice(getDateDiff(startDate, endDate));
                }}
              >
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
