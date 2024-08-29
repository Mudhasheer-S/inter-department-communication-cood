import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function Intersectdept() {
  const [projects, setProjects] = useState([]);
  const department = useSelector((state) => state.department.name);


  useEffect(() => {
    const func = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/intersecting-departments/${department}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    func();
  }, [department]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100">
        <div className="p-6 flex-grow">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <a
              key={index}
              href={`/intersectDetails/${project.id}`} 
              className="block mb-6 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {project.name}
              </h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <p className="text-gray-600 mt-2">{project.location}</p>
              <p className="text-gray-600 mt-2">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
              <hr className="mt-4" />
            </a>
            ))
          ) : (
            <p className="text-gray-600">No projects found.</p>
          )}
        </div>
    </div>
  </>
  );
}
