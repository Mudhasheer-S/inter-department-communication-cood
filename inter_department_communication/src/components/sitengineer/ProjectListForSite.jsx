import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faCalendarAlt, faBuilding, faUser, faProjectDiagram, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const ProjectListForSite = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const siteEmail = useSelector((select) => select.siteEngineer.email);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/site/engineer/project/${siteEmail}`);
        console.log(response.data);
        setTimeout(() => {
          setProjects(response.data);
          setLoading(false);
        }, 500);
      } catch (err) {
        setTimeout(() => {
          setError('Failed to load projects');
          setLoading(false);
        }, 500);
      }
    };

    fetchProjects();
  }, [siteEmail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p className="ml-4">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-black">Projects List</h1>
      <div className="grid grid-rows-1 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-lg rounded-lg p-6 relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500 border-b pb-2">
              <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
              {project.name}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2 text-green-500" />
                  <strong>Description:</strong> {project.description}
                </p>
                <p className="text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
                  <strong>Location:</strong> {project.locationName}
                </p>
                <p className="text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-yellow-500" />
                  <strong>Status percentage:</strong> 60%
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faClock} className="mr-2 text-purple-500" />
                  <strong>Start Date:</strong> {project.startDate}
                </p>
                <p className="text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faClock} className="mr-2 text-purple-500" />
                  <strong>End Date:</strong> {project.endDate}
                </p>
                <p className="text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faClock} className="mr-2 text-purple-500" />
                  <strong>Duration:</strong> {project.duration}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 text-right">
              <p className="text-gray-700 mb-2">
                <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
                <strong>Department:</strong> {project.department.departmentName}
              </p>
              <p className="text-gray-700">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-orange-500" />
                <strong>Project Manager:</strong> {project.projectManager?.name || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListForSite;
