import React, { useState } from "react";
import "./languageSelector.css";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("Eng");

  const switchLanguage = (event) => {
    event.preventDefault();
    language === "Eng" ? setLanguage("Рус") : setLanguage("Eng");
  };

  return (
    <div
      className="languageSelector"
      onClick={(event) => {
        switchLanguage(event);
      }}
    >
      <span className="unselectable">{language}</span>
    </div>
  );
};

export default LanguageSelector;
