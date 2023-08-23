import React from "react";
export default function WeatherHightLights( { weatherHightLights}) {
  const { main, wind, visibility} = weatherHightLights;
  // convert from meter to miles 
  const MeterToMiles = visibility * 0.000621371192;
  const visibilityInMiles = MeterToMiles.toFixed(2);
  return (
    <div className="today-details">
      <h2 className="hightlight">Today’s Hightlights </h2>
      <div className="today-cards">
        <div className="today-feature">
          <h3>Wind status</h3>
          <p>{`${wind.speed} mph`}</p>
          <p>WSW</p>
        </div>
        <div className="today-feature">
          <h3>Humidity</h3>
          <p> {`${main.humidity} %`}</p>
          <div className="humidity-bar"></div>
        </div>
        <div className="today-feature" id="visibility">
          <h3>Visibility</h3>
          <p>{ `${visibilityInMiles} miles`}</p>
        </div>
        <div className="today-feature " id="air">
          <h3>Air Pressure</h3>
          <p>{`${main.pressure} mb`}</p>
        </div>
      </div>
    </div>
  );
}
