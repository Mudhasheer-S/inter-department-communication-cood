import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      departmentName,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/register', registerData);
      console.log(response.data);
     
      // navigate('/');
    } catch (error) {
      console.error('There was an error registering!', error);
    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="p-6">
          <div className="relative">
            <img
              src="https://cdn2.hubspot.net/hubfs/679984/linkingdepartments10115.jpg"
              alt="Background"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl  font-bold">Register Departments</h2>
              <p className="text-sm">Join us and enhance your experience</p>
            </div>
          </div>
          <div className="text-center mb-6"></div>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Department Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <FaUser className="text-gray-500 ml-3" />
                <input
                  type="text"
                  placeholder="Enter department name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email ID
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <FaEnvelope className="text-gray-500 ml-3" />
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <FaLock className="text-gray-500 ml-3" />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
