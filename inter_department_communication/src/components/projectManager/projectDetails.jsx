import React from 'react';

export default function ProjectDetails({ project, onBack, onMarkComplete }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <button onClick={onBack} className="text-blue-500 mb-4 inline-block">Back to Projects</button>
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p className="mb-2"><strong>Status:</strong> {project.status}</p>
      <p className="mb-2"><strong>Description:</strong> {project.description}</p>
      <p className="mb-4"><strong>Location:</strong> {project.locationName}</p>
      <button
        onClick={onMarkComplete}
        className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Mark as Completed
      </button>
    </div>
  );
}
