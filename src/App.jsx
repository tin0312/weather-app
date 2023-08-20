import React from "react";
import CurrentWeather from "./components/CurrentWeather"
import FutureWeather from "./components/FutureWeather";

function App() {
  return (
    <div className="main-wrapper">
      <CurrentWeather />
      <FutureWeather />
    </div>
  );
}

export default App;
