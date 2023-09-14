import React, { useState, useEffect } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import FavouriteLocations from "./FavourtiteLocations";

export default function CurrentWeather({
  currentWeather,
  tempUnit,
  setSearchCoords,
  searchCoords,
  setSavedCoords,
  setIsDisplayed
}) {
  const [locationName, setLocationName] = useState(""); // to save location as key in localStorage
  const [isOpenned, setIsOpenned] = useState(false); // to open current weather display
  const [favLocations, setFavLocations] = useState([]); // store all pinnned locations

  const onSearchChange = (searchData) => {
    // get lat & lon coords from the searchData
    const [searchLat, searchLon] = searchData.value.split(" ");
    const [name] = searchData.label.split(", ");
    setLocationName(name);
    setSearchCoords({
      lat: searchLat,
      lon: searchLon,
    });
  };
  // render saved places from local storage
  const handleFavDropdown = () => {
    let updatedFavLocations = [];
    setIsOpenned((isOpenned) => !isOpenned);
    for (let i = 0; i < localStorage.length; i++) {
      let key = JSON.parse(localStorage.key(i) || "{}");
      updatedFavLocations.push(key);
    }
    setFavLocations(updatedFavLocations);
  };

  const closeFavDropDown = () => {
    setIsOpenned(false);
  };
  // retrieve saved location &  saved coords
  const handleSavedLocationClick = (location) => {
    setIsOpenned(false);
    getSavedCoords(location);
  };
  //retrive saved coords from localStorage and save it in savedCoords
  const getSavedCoords = (location) => {
    const value = localStorage.getItem(JSON.stringify(location));
    const { lat, lon } = JSON.parse(value || "{}");
    setSavedCoords({
      lat: lat,
      lon: lon,
    });
    setIsDisplayed(false)
  };

  return (
    <div className="current-weather-container">
      <div className="search-bar-container">
        <LocationSearch onSearchChange={onSearchChange} />
        {!isOpenned ? (
          <span
            onClick={handleFavDropdown}
            className="material-symbols-outlined saved-location"
          >
            share_location
          </span>
        ) : (
          <span
            onClick={closeFavDropDown}
            className="material-symbols-outlined saved-location"
          >
            saved_search
          </span>
        )}
      </div>
      {isOpenned ? (
        <FavouriteLocations
          favLocations={favLocations}
          handleSavedLocationClick={handleSavedLocationClick}
          setIsDisplayed = {setIsDisplayed} 
        />
      ) : (
        <CurrrentWeatherCard
          currentWeather={currentWeather}
          tempUnit={tempUnit}
          locationName={locationName}
          searchCoords={searchCoords}
        />
      )}
    </div>
  );
}
