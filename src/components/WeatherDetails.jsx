import React  from "react";
import Focast from "./Focast";
import HightLights from "./HightLights";
import Footer from "./Footer";

export default function WeatherDetails({ weatherHightLights, forecastData, toogleCelsius, toogleFah, tempUnit, allTemp }) {
  return (
    <div className="weather-detail-container">
      <div className="toogle-container">
        <span onClick = {toogleCelsius}className="C">°C</span>
        <span onClick = {toogleFah} className="F">°F</span>
      </div>
      <Focast forecastData = {forecastData} tempUnit={tempUnit} allTemp={allTemp}/>
      <HightLights weatherHightLights = {weatherHightLights} tempUnit = {tempUnit}/>
      <Footer />
    </div>
  );
}
