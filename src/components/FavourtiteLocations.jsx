import React from "react";

export default function FavouriteLocations({
  favLocations,
  handleSavedLocationClick,
  setIsDisplayed
}) {
  const handleLocationClick = (location) => {
    handleSavedLocationClick(location)
    setIsDisplayed(true)
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

