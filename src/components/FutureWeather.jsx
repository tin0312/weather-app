import React from "react";
import Focast from "./Focast";
import HightLights from "./HightLights";
import Footer from "./Footer";

export default function FutureWeather({ weatherHightLights, forecastData }) {
  return (
    <div className="weather-details">
      <div className="temperature-display">
        <span className="C">℃</span>
        <span className="F">℉</span>
      </div>
      <Focast forecastData = {forecastData} />
      <HightLights weatherHightLights = {weatherHightLights}/>
      <Footer />
    </div>
  );
}
