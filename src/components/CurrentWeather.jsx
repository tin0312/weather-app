import React from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard"
export default function CurrentWeather() {
  //a search bar and current location weather display
  return (
    <div className="current-weather">
      <div className="search-bar">
        <form action="">
          <input
            type="search"
            id="query"
            name="query"
            placeholder="Search for places"
          />
        </form>
        <span className="material-symbols-outlined">share_location</span>
      </div>
      <CurrrentWeatherCard />
    </div>
  );
}
