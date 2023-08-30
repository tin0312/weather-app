import React, {useState} from "react";
import Focast from "./Focast";
import HightLights from "./HightLights";
import Footer from "./Footer";

export default function FutureWeather({ weatherHightLights, forecastData, toogleCelsius, toogleFah, tempUnit, allTemp }) {
  return (
    <div className="weather-details">
      <div className="temperature-display">
        <span onClick = {toogleCelsius}className="C">℃</span>
        <span onClick = {toogleFah} className="F">℉</span>
      </div>
      <Focast forecastData = {forecastData} tempUnit={tempUnit} allTemp={allTemp}/>
      <HightLights weatherHightLights = {weatherHightLights} tempUnit = {tempUnit}/>
      <Footer />
    </div>
  );
}
