// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import { IoNotifications } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const departmentName = useSelector((state) => state.department.name);
  console.log({departmentName});
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-[#1d342e] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          {/* <Link to="/">Public Work Department</Link> */}
          <h2>{departmentName}</h2>
        </div>
        <button
          onClick={toggleMenu}
          className="block lg:hidden px-3 py-2 border border-gray-700 rounded text-gray-300 hover:text-white hover:border-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="lg:flex lg:space-x-4">
            <li>
              <Link to="/alldepartment" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/alldepartment" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">
                All Departments
              </Link>
            </li>
            <li>
              <Link to="/mydepartment" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">
                My Department
              </Link>
            </li>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <span className="block px-4 pt-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                Collaboration
              </span>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg">
                  <Link to="/interdepartment" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">
                    Interdepartment
                  </Link>
                  <Link to="/intradepartment" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">
                    Intradepartment
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/notification" className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded">
                <IoNotifications />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
