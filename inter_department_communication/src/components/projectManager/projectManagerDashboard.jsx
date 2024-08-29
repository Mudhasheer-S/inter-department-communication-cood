import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectManagerNavbar from './ProjectManagerNavbar';
import { useSelector } from 'react-redux';

export default function ProjectManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectManagerId = useSelector((state) => state.projectManager.id);
  const projectManagerName = useSelector((state) => state.projectManager.name);
const id = projectManagerId;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getManagerProjects/${id}`);
        console.log(response.data);
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [id]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <ProjectManagerNavbar />
      <div className="container mx-auto py-8">
        {!selectedProject ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">All Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProjectClick(project)}
                >
                  <img
                    src={`https://via.placeholder.com/300?text=${project.name}`} // Replace with actual image URL if available
                    alt={project.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    <p className="text-gray-600">Status: {project.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-6 bg-white shadow-md rounded-lg">
            <button onClick={handleBack} className="text-blue-500 mb-4 inline-block">Back to Projects</button>
            <h1 className="text-2xl font-bold mb-4">{selectedProject.name}</h1>
            <p className="mb-2"><strong>Status:</strong> {selectedProject.status}</p>
            <p className="mb-2"><strong>Description:</strong> {selectedProject.description}</p>
            <p className="mb-4"><strong>Location:</strong> {selectedProject.locationName}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Site Engineers and Their Completion Status</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Engineer Name</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Part of Project</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Completion Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">John Doe</td>
                  <td className="py-2 px-4 border-b border-gray-300">Foundation</td>
                  <td className="py-2 px-4 border-b border-gray-300">Completed</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">Jane Smith</td>
                  <td className="py-2 px-4 border-b border-gray-300">Structural Work</td>
                  <td className="py-2 px-4 border-b border-gray-300">In Progress</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">Alice Johnson</td>
                  <td className="py-2 px-4 border-b border-gray-300">Electrical</td>
                  <td className="py-2 px-4 border-b border-gray-300">Not Started</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">Bob Brown</td>
                  <td className="py-2 px-4 border-b border-gray-300">Plumbing</td>
                  <td className="py-2 px-4 border-b border-gray-300">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
