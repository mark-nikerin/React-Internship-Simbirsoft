import React from "react";
import Hamburger from "../Sidebar/Hamburger/Hamburger";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Hamburger />
      <span className="sidebar__language"></span>
    </div>
  );
};

export default Sidebar;
