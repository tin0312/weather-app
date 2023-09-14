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

