import React, {useState} from "react";
import Hamburger from "../Sidebar/Hamburger/Hamburger";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import Menu from "./Menu"
import "./sidebar.css";

const Sidebar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = (shouldOpen) => { 
    setIsMenuOpen(shouldOpen);
  }

  return (
    <div className="sidebar">
      <Hamburger isMenuOpen = {isMenuOpen} openMenu = {openMenu} /> 
      <Menu isMenuOpen = {isMenuOpen} openMenu = {openMenu}/>
      <LanguageSelector />
    </div>
  );
};

export default Sidebar;
