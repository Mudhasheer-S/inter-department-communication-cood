import React, { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function SiteEngineerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const siteEngineerName = useSelector((state) => state.siteEngineer.name);

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
          <h2>Hi! {siteEngineerName}</h2>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex lg:space-x-4">
            <li>
              <Link
                to="/siteEngineer/alldepartment"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                My Projects
              </Link>
            </li>
            <li>
              <Link
                to="/siteEngineer/report"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Daily Report
              </Link>
            </li>
            <li>
              <Link
                to="/#"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Teams
              </Link>
            </li>
            <li>
              <Link
                to="/#"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Resources
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
                  <Link
                    to="/#"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Interdepartment
                  </Link>
                  <Link
                    to="/#"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Intradepartment
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/#"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded"
              >
                <IoNotifications />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
