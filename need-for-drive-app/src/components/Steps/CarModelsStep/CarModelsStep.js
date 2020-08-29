import React from "react";
import "../steps.css";
import "./carModelsStep.css";
import firstCar from "../../../assets/cars/1.png";
import secondCar from "../../../assets/cars/2.png";
import thirdCar from "../../../assets/cars/3.png";
import fourthCar from "../../../assets/cars/4.png";
import fifthCar from "../../../assets/cars/5.png";
import sixthCar from "../../../assets/cars/6.png";

const modelFilters = ["Все модели", "Эконом", "Премиум"];
const cars = [
  {
    model: "ELANTRA",
    price: "12 000 - 25 000 ₽",
    img: `${firstCar}`,
  },
  {
    model: "i30 N",
    price: "10 000 - 32 000 ₽",
    img: `${secondCar}`,
  },
  {
    model: "CRETA",
    price: "12 000 - 25 000 ₽",
    img: `${thirdCar}`,
  },
  {
    model: "SONATA",
    price: "10 000 - 32 000 ₽",
    img: `${fourthCar}`,
  },
  {
    model: "i30 N",
    price: "10 000 - 32 000 ₽",
    img: `${fifthCar}`,
  },
  {
    model: "SONATA",
    price: "10 000 - 32 000 ₽",
    img: `${sixthCar}`,
  },
];

const CarModelsStep = ({props}) => {
  const checkedFilterId = props.fieldValues.modelFilter;
  const selectedCarId = props.fieldValues.selectedCar;

  const [categories, setCategories] = useState();
  const [cars, setCars] = useState();

  const onFilterCheck = (event, id) => {
    event.preventDefault();
    props.setField("modelFilter", id);
  };

  const onCarSelect = (event, id, model) => {
    event.preventDefault();
    props.setField("selectedCar", id);
    props.addInfoItem({ title: "Модель", value: model });
  const fetchCategories = async () => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/category",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const categoryResponse = await response.json();
    const categories = categoryResponse.data.map((category) => {
      return category.name;
    });
    setCategories(["Все модели", ...categories]);
  };

  const fetchCars = async () => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/car",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const carResponse = await response.json();
    const cars = carResponse.data.map((car) => {
      return {
        name: car.name,
        imgUrl: "http://api-factory.simbirsoft1.com" + car.thumbnail.path,
        priceMin: car.priceMin,
        priceMax: car.priceMax,
        number: car.number,
        colors: car.colors,
        tank: car.tank,
        category: car.categoryId.name,
      };
    });
    setCars(cars);
  };

  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  return (
    <div className="step">
      <div className="filters">
        {modelFilters.map((filter, id) => {
          if (id === checkedFilterId) {
            return (
              <label
                className="checked"
                key={id}
                onClick={(event) => onFilterCheck(event, id)}
              >
                <input type="radio" defaultChecked={true}></input>
                {filter}
              </label>
            );
          } else {
            return (
              <label key={id} onClick={(event) => onFilterCheck(event, id)}>
                <input type="radio"></input>
                {filter}
              </label>
            );
          }
        })}
      </div>
      <div className="cars">
        {cars.map((car, id) => {
          return (
            <div
              className={
                id === selectedCarId ? "cars__item selected" : "cars__item"
              }
              key={id}
              onClick={(event) => onCarSelect(event, id, car.model)}
            >
              <div className="title">
                <h3>{car.model}</h3>
                <span>{car.price}</span>
              </div>
              <img src={car.img} alt={car.model}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarModelsStep;
