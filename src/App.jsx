import React from "react";
import CurrentWeather from "./components/CurrentWeather"
import FutureWeather from "./components/FutureWeather";
import { getCurrentWeather } from "./services/api";

function App() {
  const [weatherData, setWeatherData] = React.useState({
      currentWeather: {
        main:{},
        weather: [],
        name: ""
      },
      weatherHightLights: {
        main: {},
        wind: {},
        visibility: ""
      }
  }) 
  React.useEffect(() => {
    const getData = async () => {
      const data = await getCurrentWeather();
      setWeatherData({
        currentWeather: {
          main: data.main,
          weather: data.weather,
          name: data.name
        },
        weatherHightLights: {
          wind: data.wind,
          visibility: data.visibility,
          main: data.main
        }
    });
    };
    getData();
  }, []);
  return (
    <div className="main-wrapper">
      <CurrentWeather currentWeather = {weatherData.currentWeather}/>
      <FutureWeather weatherHightLights = {weatherData.weatherHightLights}/>
    </div>
  );
}

export default App;
