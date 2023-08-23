import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import FutureWeather from "./components/FutureWeather";
import { getCurrentWeather } from "./services/api";

function App() {
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weatherData, setWeatherData] = useState({
    currentWeather: {
      main: {},
      weather: [],
      name: "",
    },
    weatherHightLights: {
      main: {},
      wind: {},
      visibility: "",
    },
  });
  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
        const currentWeather = await getCurrentWeather(
          geolocation.latitude,
          geolocation.longitude
        )
        setWeatherData({
          currentWeather: {
            main: currentWeather.main,
            weather: currentWeather.weather,
            name: currentWeather.name,
          },
          weatherHightLights: {
            wind: currentWeather.wind,
            visibility: currentWeather.visibility,
            main: currentWeather.main,
          },
        })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchGeolocation()
  }, [geolocation]);
  return (
    <div className="main-wrapper">
      <CurrentWeather
        currentWeather={weatherData.currentWeather}
        setWeatherData={setWeatherData}
      />
      <FutureWeather weatherHightLights={weatherData.weatherHightLights} />
    </div>
  );
}

export default App;
