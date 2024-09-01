import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DepartmentProjects from "./DepartmentProjects";
import smartcity from "../assets/smart-city1.jpg";
import Navbar from "./Navbar";

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
        const response = await axios.get(
          `http://localhost:8080/departments-name/${departmentName}/${location}`
        );
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
    <>
      <Navbar />
      <div className="mx-auto">
        {!selectedDepartment ? (
          <>
            <div className="container mx-auto p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-8xl font-extrabold text-left absolute max-lg:static">
                    Urban Governance Departments
                  </h1>
                </div>
                <div className="mt-20">
                  <img
                    src={smartcity}
                    alt="Top Image"
                    className="top-0 left-0 w-[800px] h-96 mt-0 hidden lg:block"
                  />
                </div>
              </div>
                  <hr className="border-t-4 border-black w-5/6 my-5" />
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
                      <p className="text-gray-600">
                        View ongoing and upcoming projects
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <DepartmentProjects
            departmentName={selectedDepartment}
            location={location}
            onBack={handleBack}
          />
        )}
      </div>
    </>
  );
};

export default AllDepartments;
