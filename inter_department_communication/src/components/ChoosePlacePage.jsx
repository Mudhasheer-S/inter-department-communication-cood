import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const ChoosePlacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&addressdetails=1`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const loc = {
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon),
      display_name: suggestion.display_name,
    };
    setLocation(loc);
    setSuggestions([]);
  };

  const handleChooseLocation = () => {
    if (location) {
      navigate('/post-project', { state: { location } });
    }
  };

  const MapUpdater = () => {
    const map = useMap();

    if (location) {
      map.setView([location.lat, location.lon], 15); // Adjust the zoom level as needed
    }

    return null;
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4">
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {location && (
            <>
              <Marker position={[location.lat, location.lon]}>
                <Popup>{location.display_name}</Popup>
              </Marker>
              <MapUpdater />
            </>
          )}
        </MapContainer>
      </div>
      <div className="w-1/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Choose Place</h2>
        <input
          type="text"
          placeholder="Search location"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
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
          onClick={handleChooseLocation}
          disabled={!location}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Choose Location
        </button>
      </div>
    </div>
  );
};

export default ChoosePlacePage;
