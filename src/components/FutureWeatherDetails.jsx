import React from "react";

export default function FutureWeatherDetails() {
  return (
    <div className="today-details">
      <h3 className="hightlight">Today’s Hightlights </h3>
      <div className="today-cards">
        <div className="today-feature">
          <h3>Wind status</h3>
          <p>7.7</p>
          <p>WSW</p>
        </div>
        <div className="today-feature">
          <h3>Humidity</h3>
          <p>84%</p>
          <div className="humidity-bar"></div>
        </div>
        <div className="today-feature" id="visibility">
          <h3>Visibility</h3>
          <p>6.4 miles</p>
        </div>
        <div className="today-feature " id="air">
          <h3>Air Pressure</h3>
          <p>998 mb</p>
        </div>
      </div>
    </div>
  );
}
