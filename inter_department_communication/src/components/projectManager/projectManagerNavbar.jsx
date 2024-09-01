import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoNotifications } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';

export default function ProjectManagerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projectManagerName = useSelector((state) => state.projectManager.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Implement your logout logic here
    console.log("User logged out");
    navigate("/project-manager-login"); // Redirect to login page
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h2>Welcome, {projectManagerName}!</h2>
        </div>
        <button
          onClick={toggleMenu}
          className="block lg:hidden px-3 py-2 border border-gray-400 rounded text-gray-800 hover:text-black hover:border-black focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}
        >
          <ul className="lg:flex">
            <li>
              <Link
                to="/project-manager"
                className="block px-4 py-2 text-black hover:bg-gray-100 rounded"
              >
                My Projects
              </Link>
            </li>
            <li>
              <Link
                to="/projects-overview"
                className="block px-4 py-2 text-black hover:bg-gray-100 rounded"
              >
                Projects Overview
              </Link>
            </li>
            <li>
              <Link
                to="/teams"
                className="block px-4 py-2 text-black hover:bg-gray-100 rounded"
              >
                Teams
              </Link>
            </li>
            <li>
              <Link
                to="/project-manager-resources"
                className="block px-4 py-2 text-black hover:bg-gray-100 rounded"
              >
                Resources
              </Link>
            </li>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <span className="block px-4 pt-2 text-black hover:bg-gray-100 rounded cursor-pointer">
                Collaboration
              </span>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <Link
                    to="/interdepartment"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded"
                  >
                    Interdepartment
                  </Link>
                  <Link
                    to="/intradepartment"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded"
                  >
                    Intradepartment
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/project-manager-notification"
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded"
              >
                <IoNotifications />
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800"
                title="Logout"
              >
                <IoLogOutOutline size={24} />
              </button>
            </li>
          </ul>
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-black font-semibold mb-4">
                  Are you sure you want to logout?
                </h2>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
