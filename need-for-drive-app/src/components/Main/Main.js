import React from 'react'
import "./main.css"

const Main = () => {
  return(
    <div className="main">
      <div className="main__header">
        <h2>Need for drive</h2>
        <span>Ульяновск</span>
      </div>
      <div className="main__content">
        <h1>Каршеринг</h1>
        <h1>Need for drive</h1>
        <h2>Поминутная аренда авто твоего города</h2>
        <button className="main__button">
          <span>Забронировать</span>
        </button>
      </div>
      <div className="main__footer">
        <span>© 2016-2019 «Need for drive»</span>
        <span>8 (495) 234-22-44</span>
      </div>
    </div>
  );
}

export default Main;