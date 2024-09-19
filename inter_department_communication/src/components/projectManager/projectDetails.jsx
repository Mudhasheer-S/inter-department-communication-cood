import React, { useEffect, useState } from "react";
import AssignSiteEngineer from "./AssignSiteEngineer"; // Assuming the popup component is in the same directory
import axios from "axios";
import pm from '../../assets/pro_mgr.svg';
import { FaEnvelope } from "react-icons/fa6";

export default function ProjectDetails({ project, onBack, onMarkComplete }) {
  const [isAssignEngineerOpen, setIsAssignEngineerOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleOpenAssignEngineer = () => {
    setIsAssignEngineerOpen(true);
  };

  const handleCloseAssignEngineer = () => {
    setIsAssignEngineerOpen(false);
  };

  useEffect(()=>{
    const get = async () => {
      console.log(project);
      // await axios.get("http://localhost:8080/")
    }
  },[])

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white shadow-md rounded-lg relative">
      <button onClick={onBack} className="text-blue-500 mb-4 inline-block">
        Back to Projects
      </button>
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p className="mb-2">
        <strong>Status:</strong> {project.status}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {project.description}
      </p>
      <p className="mb-4">
        <strong>Location:</strong> {project.locationName}
      </p>

      <div className="flex justify-between mt-8">
        <button
          onClick={onMarkComplete}
          className="px-4 py-2 bg-black text-white rounded transition-colors"
        >
          Mark as Completed
        </button>
        {/* <button
          onClick={handleOpenAssignEngineer}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          style={{ position: 'absolute', right: '16px', bottom: '16px' }}
        >
          Assign Site Engineer
        </button> */}
        {project.siteEngineer ? (
          <div
            className="absolute bottom-4 right-4 flex items-center space-x-2"
            onMouseEnter={() => setHoveredProject(project.name)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <img
              src={pm}
              alt={project.siteEngineer}
              className="w-9 h-9 rounded-full border-2 border-white shadow-lg cursor-pointer"
            />
            {hoveredProject === project.name && (
              <div className="absolute bottom-12 right-0 bg-gray-600 text-white text-sm rounded-lg shadow-lg p-2 z-10 flex items-center space-x-2">
                {/* <span>{project.projectManager.name}</span> */}
                <FaEnvelope className="text-blue-400" />
                <span>{project.siteEngineer}</span>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleOpenAssignEngineer}
            className="px-4 py-2 bg-black text-white rounded transition-colors"
            style={{ position: "absolute", right: "16px", bottom: "16px" }}
          >
            Assign Site Engineer
          </button>
        )}
      </div>

      {isAssignEngineerOpen && (
        <AssignSiteEngineer
          project={project}
          onClose={handleCloseAssignEngineer}
        />
      )}
    </div>
  );
}
