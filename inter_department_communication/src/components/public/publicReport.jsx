import { useNavigate } from "react-router-dom";
import PublicNavBar from "./publicNavBar";
import { useState } from "react";
export default function PublicReport() {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocationName] = useState(null);
  const navigate = useNavigate();
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&addressdetails=1`
        );

        if (response.status === 429) {
          console.error("Rate limit exceeded. Please try again later.");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // const handleSuggestionClick = (suggestion) => {
  //   setLocationName(suggestion.display_name);
  //   setSuggestions([]);
  // };

  // const handleLocation = () => {
  //   console.log(location);
  // };

  const handleSuggestionClick = (suggestion) => {
    const locationName = suggestion.display_name;
    setLocationName(suggestion.display_name);
    sessionStorage.setItem("selectedLocation", locationName);
    setSuggestions([]);
  };

  const handleLocation = () => {
    console.log(sessionStorage.getItem("selectedLocation"));
    navigate("/show-depts");
  };

  return (
    <>
      <PublicNavBar />
      <div>
        <div className="items-center p-4 flex flex-col  container">
          <h2 className="text-lg font-semibold mb-4">Choose Place</h2>
          <input
            type="text"
            placeholder="Search location"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[40%] px-3 py-2 border border-gray-300 rounded mb-4"
          />
          {suggestions.length > 0 && (
            <ul className="list-none p-0 mb-4 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-100"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
          <button
            disabled={!location}
            onClick={handleLocation}
            className="w-[40%] bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Choose Location
          </button>
        </div>
      </div>
    </>
  );
}
