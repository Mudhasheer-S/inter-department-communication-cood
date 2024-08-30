import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { PiClockCountdownFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
import pm from '../assets/pro_mgr.svg';
import AssignProjectManager from './AssignProjectManager';
import Navbar from './Navbar';


const MyDepartment = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const [selectedProject, setSelectedProject] = useState(null); // Track the project for assignment
  const [showPopup, setShowPopup] = useState(false); // Control the popup visibility

  const navigate = useNavigate();
  const departmentName = useSelector((state) => state.department.name);
  const location = useSelector((state) => state.department.location);
  const role = useSelector((state) => state.department.role);

  useEffect(() => {
    if (!departmentName) return;

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/get-project/by-department/${departmentName}/${location}/${role}`);

        if (response.status === 204) {
          // No content, set projects to an empty array
          setProjects([]);
        } else {
          setProjects(response.data);
        
        }
      } catch (err) {
        console.log(err);
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

  const handlePostProjectClick = () => {
    navigate('/post-project');
  };

  if (loading) return (
    <div className="flex justify-center items-center py-8">
      {/* <Spinner color="primary" /> Using a spinner for loading state */}
    </div>
  );

  if (error) return (
    <div className="container mx-auto py-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    </div>
  );

  // Filter projects into ongoing and upcoming
  const ongoingProjects = projects.filter(project => project.status === 'ongoing');
  const upcomingProjects = projects.filter(project => project.status === 'upcoming');
  const completedProjects = projects.filter(project => project.status === 'completed');


  ////assign
  const handleAssignClick = (project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };

 




  return (
    <>
    <Navbar />
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-600">{departmentName} Projects</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={handlePostProjectClick}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
        >
          Post Project
        </button>
      </div>

      {/* No Projects Message */}
      {projects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-xl">No projects posted.</p>
        </div>
      )}

      {/* Ongoing Projects */}
      {ongoingProjects.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ongoing Projects</h2>
          {ongoingProjects.map((project) => (
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




              {project.projectManager ? (
                <div
                  className="absolute bottom-4 right-4 flex items-center space-x-2"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={pm}
                    alt={project.projectManager.name}
                    className="w-9 h-9 rounded-full border-2 border-white shadow-lg cursor-pointer"
                  />
                  {hoveredProject === project.name &&  (
                    <div className="absolute bottom-12 right-0 bg-gray-700 text-white text-sm rounded-lg shadow-lg p-2 z-10 flex items-center space-x-2">
                      <span>{project.projectManager.name}</span>
                      <FaEnvelope className="text-blue-400" />
                      <span>{project.projectManager.email}</span>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleAssignClick(project)}
                  className="absolute bottom-4 right-4 bg-[#055A43] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#00392B] transition duration-300"
                >
                  Assign
                </button>
              )}






            </div>
          ))}
        </div>
      )}

      {/* Upcoming Projects */}
      {upcomingProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Upcoming Projects</h2>
          {upcomingProjects.map((project) => (
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


              {project.projectManager ? (
                <div
                  className="absolute bottom-4 right-4 flex items-center space-x-2"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={pm}
                    alt={project.projectManager.name}
                    className="w-9 h-9 rounded-full border-2 border-white shadow-lg cursor-pointer"
                  />
                  {hoveredProject === project.name &&  (
                    <div className="absolute bottom-12 right-0 bg-gray-600 text-white text-sm rounded-lg shadow-lg p-2 z-10 flex items-center space-x-2">
                      <span>{project.projectManager.name}</span>
                      <FaEnvelope className="text-blue-400" />
                      <span>{project.projectManager.email}</span>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleAssignClick(project)}
                  className="absolute bottom-4 right-4 bg-[#055A43] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#00392B] transition duration-300"
                >
                  Assign
                </button>
              )}


            </div>
          ))}
        </div>
      )}




{completedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Completed Projects</h2>
          {completedProjects.map((project) => (
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


              {project.projectManager ? (
                <div
                  className="absolute bottom-4 right-4 flex items-center space-x-2"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={pm}
                    alt={project.projectManager.name}
                    className="w-9 h-9 rounded-full border-2 border-white shadow-lg cursor-pointer"
                  />
                  {hoveredProject === project.name &&  (
                    <div className="absolute bottom-12 right-0 bg-gray-600 text-white text-sm rounded-lg shadow-lg p-2 z-10 flex items-center space-x-2">
                      <span>{project.projectManager.name}</span>
                      <FaEnvelope className="text-blue-400" />
                      <span>{project.projectManager.email}</span>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleAssignClick(project)}
                  className="absolute bottom-4 right-4 bg-[#055A43] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#00392B] transition duration-300"
                >
                  Assign
                </button>
              )}


            </div>
          ))}
        </div>
)}



      {/* Show the popup for assigning a project manager */}
      {showPopup && selectedProject && (
        <AssignProjectManager
          project={selectedProject}
          onClose={handleClosePopup}
        />
      )}



    </div>
    </>
  );
};

export default MyDepartment;
