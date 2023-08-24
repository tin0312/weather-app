import React from "react";
import moment from "moment";

export default function CurrentWeatherCard({ currentWeather }) {
  const { weather, temp, name, time_stamp } = currentWeather;
  const CelsiusTemp = (temp - 273.15).toFixed(0)
  const formattedDate = moment.unix(time_stamp).utc().format(' dddd, D MMMM');


  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img
          src={weather === "Clear" ? "src/assets/Clear.png" : "src/assets/LightCloud.png"}
          alt="status"
        />
        <h1 className="temperature"> {`${CelsiusTemp} °C` } </h1>
        <h2 className="activity">{weather}</h2>
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

