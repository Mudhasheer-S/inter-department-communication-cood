import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Navbar from './Navbar';

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
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, [id]);

    const evaluateProjects = (projects) => {
        let canWeDo = true;
        let completed = false;

        for (const project of projects) {
            if (project.status !== 'completed') {
                if (project.departmentName === department) {
                    break;
                }
                canWeDo = false;
            }
            if (project.status === 'completed' && project.departmentName === department) {
                completed = true;
                break;
            }
        }

        if (completed) {
            setMessage("You have completed your project");
        } else if (canWeDo) {
            setMessage('You can start work on your project.');
        } else {
            setMessage('Please wait for other departments to complete their work.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-8">
                <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-6xl">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Intersect Details</h1>
                    {message && <p className="mb-8 text-xl font-semibold text-indigo-600 text-center">{message}</p>}
                    {projects.length > 0 ? (
                        <div className="text-center">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className={`mb-8 p-6 rounded-lg border text-center ${
                                        project.departmentName === department
                                            ? 'bg-blue-50 border-blue-400'
                                            : 'bg-white border-gray-200'
                                    } shadow-sm`}
                                >
                                    <p className="text-lg font-semibold text-gray-700">Project Name: {project.name}</p>
                                    <p className="text-gray-600 mt-2">Department: {project.departmentName}</p>
                                    <p className="text-gray-600 mt-2">Project Description: {project.description}</p>
                                    <p className="text-gray-600 mt-2">Project Location: {project.locationName}</p>
                                    <p className="text-gray-600 mt-2">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                                    <p className="text-gray-600 mt-2">Status: {project.status}</p>
                                    {project.department && project.department.departmentName === department && (
                                        <p className="mt-2 text-green-500 font-semibold">This is your project!</p>
                                    )}
                                    <hr className="my-4 border-gray-300" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-4 text-lg text-gray-600 text-center">Loading project details...</p>
                    )}
                </div>
            </div>
        </>
    );
}
