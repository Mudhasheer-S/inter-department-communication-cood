import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ProjectList({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectManagerId = useSelector((state) => state.projectManager.id);
  const id = projectManagerId;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/getManagerProjects/${id}`);
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Error fetching projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectManagerId]);

  if (loading) return <div className="text-center text-gray-500">Loading projects...</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (projects.length === 0) return <div className="text-center text-gray-500">No projects available.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id} // Use a unique identifier if available
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectProject(project)}
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
  );
}
