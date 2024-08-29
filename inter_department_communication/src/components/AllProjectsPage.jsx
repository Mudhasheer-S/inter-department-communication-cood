import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const AllProjectsPage = () => {
  const location = useLocation();
  const projects = location.state?.projects || [];

  return (
    <>
    <Navbar />
    <div>
      <h2>All Projects</h2>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {projects.map((project, index) => (
          <Marker key={index} position={[project.lat, project.lon]}>
            <Tooltip>{project.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </>
  );
};

export default AllProjectsPage;
