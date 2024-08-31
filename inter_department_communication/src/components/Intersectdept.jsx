import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function Intersectdept() {
  const [projects, setProjects] = useState([]);
  const department = useSelector((state) => state.department.name);
  const location = useSelector((state) => state.department.location);

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/intersecting-departments/${department}/${location}`
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
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="p-8 max-w-5xl mx-auto">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <a
                key={index}
                href={`/intersectDetails/${project.id}`}
                className="block mb-8 p-6 bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold text-gray-700">
                  {project.name}
                </h2>
                <p className="text-gray-500 mt-2">{project.description}</p>
                <p className="text-gray-500 mt-2">{project.locationName}</p>
                <p className="text-gray-500 mt-2">
                  {new Date(project.startDate).toLocaleDateString()}
                </p>
                <hr className="mt-4 border-gray-200" />
              </a>
            ))
          ) : (
            <p className="text-gray-500">No projects found.</p>
          )}
        </div>
      </div>
    </>
  );
}
