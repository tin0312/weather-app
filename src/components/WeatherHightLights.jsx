import React from "react";
export default function WeatherHightLights( { weatherHightLights}) {
  const { wind_speed, wind_direction, humidity, air_pressure, feels_like} = weatherHightLights;
  return (
    <div className="today-details">
      <h2 className="hightlight">Today’s Hightlights </h2>
      <div className="today-cards">
        <div className="today-feature">
          <h3>Wind status</h3>
          <p> {wind_speed} mph</p>
          <p>{wind_direction}</p>
        </div>
        <div className="today-feature">
          <h3>Humidity</h3>
          <p> { humidity} %</p>
          <div className="humidity-bar"></div>
        </div>
        <div className="today-feature" id="visibility">
          <h3>Feel Like</h3>
          <p> {feels_like} </p>
        </div>
        <div className="today-feature " id="air">
          <h3>Air Pressure</h3>
          <p> {air_pressure} mb</p>
        </div>
      </div>
    </div>
  );
}

