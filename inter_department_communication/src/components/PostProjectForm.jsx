import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const PostProjectForm = () => {
  const locationFromChoosePlace = useLocation().state?.location;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(locationFromChoosePlace || '');
  const [status, setStatus] = useState('ongoing');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [access, setAccess] = useState('public');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const departmentName = useSelector((state) => state.department.name);
  const departmentLocation = useSelector((state) => state.department.location);

  const handleLocationChoose = () => {
    navigate('/choose-location');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = {
      name,
      description,
      locationName: location.display_name || '',
      locationLat: location.lat || 0,
      locationLon: location.lon || 0,
      status,
      startDate,
      duration,
      access,
    };
  

    try {
      const response = await axios.post(
        `http://localhost:8080/post-project/${departmentName}/${departmentLocation}`,
        project
      );

      if (response.status === 201) {
        console.log('Project created successfully:', response.data);
        navigate('/mydepartment');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again.');
    }
  };



  return (
    <>
    <Navbar />
    <div className="max-w-screen-lg mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Post New Project</h1>
      <form onSubmit={handleSubmit} className="max-w-xxl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleLocationChoose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
            >
              Choose Location
            </button>
            {location && <span className="ml-4">{location.display_name}</span>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            >
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
            />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 2 months or 1 year"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Access</label>
          <select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
          Submit
        </button>
      </form>
    </div>
  </>
  );
};

export default PostProjectForm;
