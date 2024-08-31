import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { PiClockCountdownFill } from "react-icons/pi";
import { IoReturnUpBack } from "react-icons/io5";
import { useSelector } from 'react-redux';

const DepartmentProjects = ({ departmentName,location, onBack }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!departmentName) return;

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/get-project/by-department/${departmentName}/${location}`);
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [departmentName]);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <button
        onClick={onBack} // Use the passed onBack function to handle navigation
        className="mb-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <IoReturnUpBack />
      </button>

      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-600">{departmentName} Projects</h1>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="container mx-auto py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error.message}</span>
          </div>
        </div>
      )}

      {/* Display Ongoing Projects */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ongoing Projects</h2>
        {Array.isArray(projects) && projects.filter(project => project.status === 'ongoing').length > 0 ? (
          projects.filter(project => project.status === 'ongoing').map((project) => (
            <div key={project.name} className="bg-white shadow-lg rounded-lg p-8 mb-8 transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">{project.name}</h3>
                <p className={`text-sm font-medium ${project.access === 'public' ? 'text-green-600' : 'text-red-600'} italic`}>
                  {project.access === 'public' ? 'Public' : 'Private'}
                </p>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex items-center text-gray-600 space-x-6">
                <div className="flex items-center">
                  <FaLocationDot className="mr-2 text-green-700" />
                  <span>{project.locationName}</span>
                </div>
                <div className="flex items-center">
                  <SlCalender className="mr-2 text-green-700" />
                  <span>{formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <PiClockCountdownFill className="mr-2 text-green-700" />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No ongoing projects.</p>
        )}
      </div>

      {/* Display Upcoming Projects */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Upcoming Projects</h2>
        {Array.isArray(projects) && projects.filter(project => project.status === 'upcoming').length > 0 ? (
          projects.filter(project => project.status === 'upcoming').map((project) => (
            <div key={project.name} className="bg-white shadow-lg rounded-lg p-8 mb-8 transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">{project.name}</h3>
                <p className={`text-sm font-medium ${project.access === 'public' ? 'text-green-600' : 'text-red-600'} italic`}>
                  {project.access === 'public' ? 'Public' : 'Private'}
                </p>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex items-center text-gray-600 space-x-6">
                <div className="flex items-center">
                  <FaLocationDot className="mr-2 text-green-700" />
                  <span>{project.locationName}</span>
                </div>
                <div className="flex items-center">
                  <SlCalender className="mr-2 text-green-700" />
                  <span>{formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <PiClockCountdownFill className="mr-2 text-green-700" />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming projects.</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentProjects;
