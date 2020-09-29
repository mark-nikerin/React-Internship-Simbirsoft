import React from "react";
import "./footer.css";

const Footer = () => {
  return (<div className="admin-footer">
    <div className="links">
      <a href="#/admin">Главная страница</a>
      <a href="#/admin">Ссылка</a>
    </div>
    <span>Copyright © 2020 Simbirsoft</span>
  </div>);
}

export default Footer;