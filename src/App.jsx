import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import FutureWeather from "./components/FutureWeather";
import { getSixDaysWeather } from "./services/api";

function App() {
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weatherData, setWeatherData] = useState({
    currentWeather: {
      time_stamp: "",
      temp: "",
      weather: "",
      name: "",
    },
    weatherHightLights: {
      wind_speed: "",
      wind_direction: "",
      feels_like: "",
      humidity: "",
      air_pressure: "",
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
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };
    fetchGeolocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeather = await getSixDaysWeather(
          geolocation.latitude,
          geolocation.longitude
        );
        setWeatherData({
          currentWeather: {
            time_stamp: currentWeather.list[0].dt,
            temp: currentWeather.list[0].temp.day,
            weather: currentWeather.list[0].weather[0].main,
            name: currentWeather.city.name,
          },
          weatherHightLights: {
            wind_speed: currentWeather.list[0].speed,
            wind_direction: currentWeather.list[0].deg,
            feels_like: currentWeather.list[0].feels_like.day,
            humidity: currentWeather.list[0].humidity,
            air_pressure: currentWeather.list[0].pressure,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWeatherData();
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
