import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectManagerNavbar from './ProjectManagerNavbar';

export default function ProjectManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const id = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getManagerProjects/${id}`);
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <ProjectManagerNavbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">All Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
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
      </div>
    </div>
  );
}
