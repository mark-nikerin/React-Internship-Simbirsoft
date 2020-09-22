import React from "react";
import Card from "../Base/Card";
import "./auth.css";
import icons from "../../../assets/admin-icons.svg";

const Auth = () => {
  return (
    <div className="auth">
      <div className="logo">
        <svg width="45px" height="45px">
          <use xlinkHref={`${icons}#logo`} />
        </svg>
        <span>Need for drive</span>
      </div>
      <Card>
        <h1>
          Вход
        </h1>
        <div>Нормально</div>
      </Card>
    </div>
  );
};

export default Auth;
