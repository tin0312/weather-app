import React from "react";

export default function FavouriteLocations({
  favLocations,
  handleSavedLocationClick
}) {
  const handleLocationClick = (location) => {
    handleSavedLocationClick(location)
  };
  return (
    <div>
      <ul className="favourite-locations">
        {favLocations.map((favLocation) => (
          <li
            onClick={() => handleLocationClick(favLocation)}
            key={favLocation}
          >
            {favLocation}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*

click on saved location 

=> toogle isDisplayed to True to use savedWeather fetched data

=> display searchWeather with save weather data. 

=> send saved location to CurrentWeather 

=> CurrentWeather uses that saved location to pull coords saved in local storage

=> CurrentWeather uses that saved location coords to make an API call to get new weatherData

=> CurrentWeather uses the boolean isDisplayed to determine which source to use between searchWeather & savedWeather

=> CurrentWeather uses that determined source to fetch the date into set searchWeatherData

=> CurrentWeather uses that fetched data to display the weather

*/
