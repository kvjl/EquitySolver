import React, { useState } from "react";
import axios from "axios";

function HomeFinder() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [homeState, setHomeState] = useState("");
  const [zipcode, setZipCode] = useState("");

  const fetchZillowData = async (query) => {
    try {
      const response = await axios.get(
        "https://api.zillow.com/v1/...your-endpoint",
        {
          params: {
            q: query,
            // Add other necessary parameters here
          },
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data from Zillow API", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchZillowData(searchInput);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleHomeStateChange = (e) => {
    setHomeState(e.target.value);
  };

  const handleZipChange = (e) => {
    setZipCode(e.target.value);
  };

  return (
    <div>
      <form className="home-finder-form" onSubmit={handleSearchSubmit}>
        <label>Home Finder</label>
        <input
          type="text"
          placeholder="Search here"
          onChange={handleSearchChange}
          value={searchInput}
        />
        <input
          type="text"
          id="home-finder-address-input"
          placeholder="Address"
          onChange={handleAddressChange}
          value={address}
        />
        <input
          type="text"
          id="home-finder-city-input"
          placeholder="City"
          onChange={handleCityChange}
          value={city}
        />
        <input
          type="text"
          placeholder="State"
          id="home-finder-state-input"
          onChange={handleHomeStateChange}
          value={homeState}
        />
        <input
          type="text"
          id="home-finder-zip-input"
          placeholder="Zip"
          onChange={handleZipChange}
          value={zipcode}
        />

        <button type="submit">Search</button>
      </form>

      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
            {/* Display other relevant information */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeFinder;
