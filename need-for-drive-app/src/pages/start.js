import React from "react"
import Sidebar from "../components/Sidebar"
import Slider from "../components/Slider"
import Main from "../components/Main" 
import "./start.css"
 
const StartPage = () => {
  return (
    <div className="start">
      <Sidebar /> 
      <Main /> 
      <Slider />
    </div>
  );
}

export default StartPage;