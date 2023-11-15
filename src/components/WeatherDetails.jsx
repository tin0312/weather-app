import React  from "react";
import Focast from "./Focast";
import HightLights from "./HightLights";
import Footer from "./Footer";

export default function WeatherDetails({ weatherHightLights, forecastData, toogleCelsius, toogleFah, tempUnit, allTemp }) {
  const toogleTemp = () => {
    const checkbox = document.querySelector(".checkbox");
    checkbox?.addEventListener("change", () => {
      if (checkbox.checked) {
        toogleFah();
      } else {
        toogleCelsius();
      }
    });
  }
  return (
    <div className="weather-detail-container">
        <div className="toogle-container">
          <div className="toogle-switch" id = "button-1">
              <input onClick = {toogleTemp} type = "checkbox" className= "checkbox"/>
              <div className="knobs"></div>
              <div className="layer"></div> 
          </div> 
        </div>
        <Focast forecastData = {forecastData} tempUnit={tempUnit} allTemp={allTemp}/>
        <HightLights weatherHightLights = {weatherHightLights} tempUnit = {tempUnit}/>
        <Footer />
      </div>
  );
}
