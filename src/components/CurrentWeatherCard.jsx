import React from "react";

export default function CurrentWeatherCard() {
  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img src="" alt="status" />
        <h1 className="temperature">15 C</h1>
        <h2 className="activity">Shower</h2>
      </div>
      <div className="date-location">
        <h3 className="date">Monday, 22 June</h3>
        <h3 className="location">
          <span className="material-symbols-outlined">location_on</span>
          London, UK
        </h3>
      </div>
    </div>
  );
}
