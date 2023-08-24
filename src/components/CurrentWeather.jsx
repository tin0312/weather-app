import React, { useState, useEffect } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./searchBar";
import { getCurrentWeather } from "../services/api";

export default function CurrentWeather({ currentWeather }) {
  
  return (
    <div className="current-weather">
      <div className="search-bar">
        <LocationSearch />
        <span className="material-symbols-outlined">share_location</span>
      </div>
      <CurrrentWeatherCard currentWeather={currentWeather} />
    </div>
  );
}
