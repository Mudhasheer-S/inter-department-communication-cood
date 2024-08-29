import React, { useState } from 'react';
import ProjectList from './projectList';
import ProjectCompletion from './projectCompletion';
import ProjectManagerNavbar from './projectManagerNavbar';
import ProjectDetails from './projectDetails';

export default function ProjectManagerDashboard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsMarkingComplete(false);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    setIsMarkingComplete(false);
  };

  const handleMarkComplete = () => {
    setIsMarkingComplete(true);
  };

  return (
    <div>
      <ProjectManagerNavbar />
      <div className="container mx-auto py-8">
        {!selectedProject ? (
          <ProjectList onSelectProject={handleProjectSelect} />
        ) : isMarkingComplete ? (
          <ProjectCompletion project={selectedProject} onBack={handleBackToList} />
        ) : (
          <ProjectDetails
            project={selectedProject}
            onBack={handleBackToList}
            onMarkComplete={handleMarkComplete}
          />
        )}
      </div>
    </div>
  );
}
