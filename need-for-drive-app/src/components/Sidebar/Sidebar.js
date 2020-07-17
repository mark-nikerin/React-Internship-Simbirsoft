import React from "react";
import Hamburger from "../Sidebar/Hamburger/Hamburger";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import "./sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Hamburger />
      <LanguageSelector />
    </div>
  );
};

export default Sidebar;
