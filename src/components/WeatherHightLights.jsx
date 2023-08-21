import React from "react";
export default function WeatherHightLights( { weatherHightLights}) {
  const { main, wind, visibility} = weatherHightLights;
  return (
    <div className="today-details">
      <h3 className="hightlight">Today’s Hightlights </h3>
      <div className="today-cards">
        <div className="today-feature">
          <h3>Wind status</h3>
          <p>{wind.speed}</p>
          <p>WSW</p>
        </div>
        <div className="today-feature">
          <h3>Humidity</h3>
          <p> {`${main.humidity} %`}</p>
          <div className="humidity-bar"></div>
        </div>
        <div className="today-feature" id="visibility">
          <h3>Visibility</h3>
          <p>{ `${visibility} meters`}</p>
        </div>
        <div className="today-feature " id="air">
          <h3>Air Pressure</h3>
          <p>{`${main.pressure} mb`}</p>
        </div>
      </div>
    </div>
  );
}
