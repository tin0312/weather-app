import React from "react";
import FutureWeatherCard from "./FutureWeatherCard";
import WeatherHightLights from "./WeatherHightLights";
import Footer from "./Footer";

export default function FutureWeather({ weatherHightLights }) {
  return (
    <div className="weather-details">
      <div className="temperature-display">
        <span className="C">℃</span>
        <span className="F">℉</span>
      </div>
      <FutureWeatherCard />
      <WeatherHightLights weatherHightLights = {weatherHightLights}/>
      <Footer />
    </div>
  );
}
