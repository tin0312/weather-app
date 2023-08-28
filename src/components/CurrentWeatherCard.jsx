import React from "react";
import moment from "moment";

export default function CurrentWeatherCard({ currentWeather }) {
  const { weather, temp, name, time_stamp } = currentWeather;
  const CelsiusTemp = (temp - 273.15).toFixed(0)
  const formattedDate = moment.unix(time_stamp).utc().format(' ddd, D MMM');
  const weatherIcons =
    weather === "Clear"
      ? "src/assets/Clear.png"
      : weather === "Clouds" && currentWeather.clouds < 25
      ? "src/assets/LightCloud.png"
      : weather === "Clouds" && currentWeather.clouds > 85
      ? "src/assets/HeavyCloud.png"
      : weather === "Clouds"
      ? "src/assets/LightCloud.png"
      : weather === "Rain" && currentWeather.description === "light rain"
      ? "src/assets/LightRain.png"
      : weather === "Rain" && currentWeather.description === "very heavy rain"
      ? "src/assets/HeavyRain.png"
      : weather === "Rain" && currentWeather.description === "shower rain"
      ? "src/assets/Shower.png"
      : weather === "Rain"
      ? "src/assets/LightRain.png"
      : weather === "Snow"
      ? "src/assets/Snow.png"
      : weather === "Snow" && currentWeather.description === "sleet"
      ? "src/assets/Sleet.png"
      : weather === "Thunderstorm"
      ? "src/assets/Thunderstorm.png"
      : "";
  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img
          src={weatherIcons}
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

