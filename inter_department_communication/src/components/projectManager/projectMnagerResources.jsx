import React from 'react'
import ProjectManagerNavbar from './ProjectManagerNavbar'



const ProjectManagerResources = () => {
    return (
        <>
      <ProjectManagerNavbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Project Manager Resources</h1>

        {/* Available Resources Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Resources</h2>
          <ul className="space-y-3">
            {/* Replace with dynamic data */}
            <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <span>Resource 1</span>
              <span className="text-green-600 font-medium">Available</span>
            </li>
            <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <span>Resource 2</span>
              <span className="text-green-600 font-medium">Available</span>
            </li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Requested Resources Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Requested Resources</h2>
          <ul className="space-y-3">
            {/* Replace with dynamic data */}
            <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <span>Resource A</span>
              <span className="text-yellow-600 font-medium">Pending Approval</span>
            </li>
            <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <span>Resource B</span>
              <span className="text-red-600 font-medium">Denied</span>
            </li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Allocated Resources Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Allocated Resources</h2>
          <ul className="space-y-3">
            {/* Replace with dynamic data */}
            <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <span>Resource X</span>
              <span className="text-blue-600 font-medium">Allocated</span>
            </li>
            <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <span>Resource Y</span>
              <span className="text-blue-600 font-medium">Allocated</span>
            </li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Request Resources Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Request Resources</h2>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Resource Name"
              className="border border-gray-300 p-3 rounded-lg w-full mr-4"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Request Resource
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectManagerResources;
