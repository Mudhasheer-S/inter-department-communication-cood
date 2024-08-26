import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function IntersectDetails() {
    const department = useSelector((state) => state.department.name);
    const departmentId = useSelector((state) => state.department.id);
    const { id } = useParams(); 
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/getProjectsWithSameLocation/${id}`)
      .then(response => {
        setProjects(response.data);
        evaluateProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, [id]);

  const evaluateProjects = (projects) => {
    let canWeDo = true;
    let completed = false;
    for (const project of projects)
    {
      if (project.status !== 'Completed') 
      {
        if (project.departmentId === departmentId) 
        {
          break;
        }
        canWeDo = false;
      }
      if(project.status==='Completed' && project.departmentId===departmentId)
      {
        completed=true;
        break;
      }
    }
    if(completed)
    {
      setMessage("You have completed your project");
    }
    else if (canWeDo) 
    {
      setMessage('You can start work on your project.');
    } 
    else if(!canWeDo)
    {
      setMessage('Please wait for other departments to complete their work.');
    }
  };

  return (
    <div className="flex">
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Intersect Details</h1>
        {message && <p className="mt-4 text-lg font-semibold text-blue-600">{message}</p>}
        {projects.length > 0 ? (
          <div className="mt-4">
            {projects.map(project => (
              <div 
                key={project.id} 
                className={`mb-6 p-4 border ${project.departmentId === departmentId ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-300'}`}
              >
                <p className="text-lg font-semibold">Project Name: {project.name}</p>
                <p className="text-lg">Department: {department}</p>
                <p className="text-lg">Project Description: {project.description}</p>
                <p className="text-lg">Project Location: {project.locationName}</p>
                <p className="text-lg">Start Date: {project.startDate}</p>
                <p className="text-lg">Status: {project.status}</p>
                {project.departmentId === departmentId && (
                  <p className="mt-2 text-green-600 font-semibold">This is your project!</p>
                )}
                <hr className="my-4" />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-lg">Loading project details...</p>
        )}
      </div>
    </div>
  );
}
