import React from "react";
import moment from "moment";

export default function CurrentWeatherCard({ currentWeather }) {
  const { weather, main, name, dt } = currentWeather;
  const weatherDescription = weather.length > 0 ? weather[0]?.main : "";
  const CelsiusTemp = (main.temp - 273.15).toFixed(0)
  
  const formattedDate = moment(dt).format(' dddd, D MMMM');

  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img
          src={weatherDescription === "Clear" ? "src/assets/Clear.png" : "src/assets/LightCloud.png"}
          alt="status"
        />
        <h1 className="temperature"> {`${CelsiusTemp} °C` } </h1>
        <h2 className="activity">{weatherDescription}</h2>
      </div>
      <div className="date-location">
        <h3 className="date">{`Today  •   ${formattedDate}`}</h3>
        <h3 className="location">
          <span className="material-symbols-outlined">location_on</span>
          {name}
        </h3>
      </div>
    </div>
  );
}

