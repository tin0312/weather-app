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
  setIsDisplayed,
}) {
  const [locationName, setLocationName] = useState(""); // save locations in localStorage
  const [isOpenned, setIsOpenned] = useState(false); // open saved weather
  const [searchWindow, setSearchWindow] = useState(false); // toogle search window view

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
    setIsOpenned((isOpenned) => !isOpenned);
  };

  const closeFavDropDown = () => {
    setIsOpenned(false);
  };
  // retrieve saved location &  saved coords
  const handleSavedLocationClick = (location) => {
    setLocationName(location.location);
    setIsOpenned(false);
    getSavedCoords(location.lat, location.lon);
  };
  //retrive saved coords from localStorage and save it in savedCoords
  const getSavedCoords = (lat, lon) => {
    setSavedCoords({
      lat: lat,
      lon: lon
    });
  };

  return (
    <div
      className={`${
        searchWindow ? "search-window-view" : "current-weather-container"
      }`}
    >
      <LocationSearch
        onSearchChange={onSearchChange}
        isOpenned={isOpenned}
        handleFavDropdown={handleFavDropdown}
        closeFavDropDown={closeFavDropDown}
        setSearchWindow={setSearchWindow}
        searchWindow={searchWindow}
      />
      {isOpenned ? (
        <FavouriteLocations
          handleSavedLocationClick={handleSavedLocationClick}
          setIsDisplayed={setIsDisplayed}
          getSavedCoords={getSavedCoords}
        />
      ) : !isOpenned && !searchWindow ? (
        <CurrrentWeatherCard
          currentWeather={currentWeather}
          tempUnit={tempUnit}
          locationName={locationName}
          searchCoords={searchCoords}
        />
      ) : null}
    </div>
  );
}

