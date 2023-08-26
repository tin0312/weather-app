import React from "react";
import Focast from "./Focast";
import HightLights from "./HightLights";
import Footer from "./Footer";

export default function FutureWeather({ weatherHightLights }) {
  return (
    <div className="weather-details">
      <div className="temperature-display">
        <span className="C">℃</span>
        <span className="F">℉</span>
      </div>
      <Focast />
      <HightLights weatherHightLights = {weatherHightLights}/>
      <Footer />
    </div>
  );
}
