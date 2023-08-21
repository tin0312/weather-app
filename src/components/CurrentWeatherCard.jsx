import React from "react";

export default function CurrentWeatherCard({ currentWeather }) {
  const { weather, main, name } = currentWeather;
  const weatherDescription = weather.length > 0 ? weather[0]?.main : "";
  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img
          src={weatherDescription === "Clear" ? "src/assets/Clear.png" : "src/assets/LightCloud.png"}
          alt="status"
        />
        <h1 className="temperature"> {main.temp} K</h1>
        <h2 className="activity">{weatherDescription}</h2>
      </div>
      <div className="date-location">
        <h3 className="date">Monday, 22 June</h3>
        <h3 className="location">
          <span className="material-symbols-outlined">location_on</span>
          {name}
        </h3>
      </div>
    </div>
  );
}