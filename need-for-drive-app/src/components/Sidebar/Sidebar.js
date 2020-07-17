import React from "react";
import Hamburger from "../Sidebar/Hamburger/Hamburger";
import "./sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Hamburger />
      <span className="sidebar__language"></span>
    </div>
  );
};

export default Sidebar;
