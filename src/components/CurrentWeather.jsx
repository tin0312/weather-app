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
  const [favLocations, setFavLocations] = useState([]); // save pinnned locations
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
    setLocationName(location);
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
          favLocations={favLocations}
          handleSavedLocationClick={handleSavedLocationClick}
          setIsDisplayed={setIsDisplayed}
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

