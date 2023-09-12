import React from "react";

export default function FavouriteLocations({
  favLocations,
  setIsDisplayed,
  setSavedLocation,
  setIsOpenned,
  setSavedCoords
}) {
  const handleLocationClick = (location) => {
    // pull lat and lon from local storage
    setIsDisplayed(true);
    setSavedLocation(location);
    setIsOpenned(false);
    setSavedCoords({})
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
