import React from "react";
import Card from "../Base/Card";
import Input from "../Base/Input";
import Button from "../Base/Button";
import "./auth.css";
import icons from "../../../assets/admin-icons.svg";

const Auth = (props) => {

  return (
    <div className="auth">
      <div className="logo">
        <svg width="45px" height="45px">
          <use xlinkHref={`${icons}#logo`} />
        </svg>
        <span>Need for drive</span>
      </div>
      <Card  onClick={() => { console.log("Print some text"); }}>
        <h1>Вход</h1>
        <Input header={"Почта"} placeholder={"Введите почту"} />
        <Input header={"Пароль"} placeholder={"Введите пароль"} />
        <div className="auth-actions">
          <a href="#/admin">Запросить доступ</a>
          <Button
            style={{ width: "120px", height: "30px" }}
            text="Войти"
            onClick={props.onAuthorize}
          />
        </div>
      </Card>
      <div></div>
    </div>
  );
};

export default Auth;
