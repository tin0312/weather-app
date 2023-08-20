import React from "react";
import FutureWeatherCard from "./FutureWeatherCard";
import FutureWeatherDetails from "./FutureWeatherDetails";
import Footer from "./Footer";

export default function FutureWeather() {
  return (
    <div className="weather-details">
      <div className="temperature-display">
        <span className="C">℃</span>
        <span className="F">℉</span>
      </div>
      <FutureWeatherCard />
      <FutureWeatherDetails />
      <Footer />
    </div>
  );
}
