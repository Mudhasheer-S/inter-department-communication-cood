import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DepartmentProjects from './DepartmentProjects';

const AllDepartments = () => {
  const [departmentNames, setDepartmentNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  
  const navigate = useNavigate();
  const departmentName = useSelector((state) => state.department.name);
  const location = useSelector((state) => state.department.location);

  useEffect(() => {
    if (!departmentName) return;

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/departments-name/${departmentName}/${location}`);
        setDepartmentNames(response.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, [departmentName]);

  const handleDepartmentClick = (name) => {
    setSelectedDepartment(name);
  };

  const handleBack = () => {
    setSelectedDepartment(null);
  };

  return (
    <div className="container mx-auto py-8">
      {!selectedDepartment ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">Urban Governance Departments</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {departmentNames.map((name, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleDepartmentClick(name)}
              >
                <img
                  src={`https://via.placeholder.com/300?text=${name}`} // Replace with actual image URL if available
                  alt={name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-gray-600">View ongoing and upcoming projects</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <DepartmentProjects departmentName={selectedDepartment} location={location} onBack={handleBack} />
      )}
    </div>
  );
};

export default AllDepartments;
