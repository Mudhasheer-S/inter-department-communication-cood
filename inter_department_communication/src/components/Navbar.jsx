import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline, IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from "../Redux/departmentSlice";
// import { logout } from './redux/departmentSlice';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const departmentName = useSelector((state) => state.department.name);
  const location = useSelector((state) => state.department.location);
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
    // Perform logout logic here
    // e.g., clear tokens, update state, redirect to login page
    dispatch(logout());
    console.log("User logged out");
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-[#1d342e] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h2>{location}-{departmentName}</h2>
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
          <ul className="lg:flex ">
            <li>
              <Link
                to="/head/alldepartment"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/head/alldepartment"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                All Departments
              </Link>
            </li>
            <li>
              <Link
                to="/mydepartment"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                My Department
              </Link>
            </li>
            <li>
              <Link
                to="/intersectDept"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Overlapping Projects
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
                    to="/interdepartment"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Interdepartment
                  </Link>
                  <Link
                    to="/intradepartment"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Intradepartment
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/notification"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded"
              >
                <IoNotifications />
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700"
                title="Logout"
              >
                <IoLogOutOutline size={24} />
              </button>
            </li>
          </ul>
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-slate-950 font-semibold mb-4">
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
};

export default Navbar;
