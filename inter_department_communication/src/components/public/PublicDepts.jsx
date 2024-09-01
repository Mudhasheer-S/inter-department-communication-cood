import { useEffect, useState } from "react";
import axios from "axios";
import PublicReport from "./publicReport";
export default function PublicDepts() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const locationName = encodeURIComponent(
        sessionStorage.getItem("selectedLocation")
      );
      console.warn(locationName);

      try {
        const response = await axios.get(
          `http://localhost:8080/getByLocation/${locationName}`
        );
        setProjects(response.data);
      } catch (e) {
        console.error("An error occurred", e);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div>
      <PublicReport />
      <div className="container bg-gray-100 overflow-y-auto h-[100vh]">
        <div className="container mx-auto py-10">
          <div className="flex justify-center mx-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-lg bg-white overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-teal-600 cursor-pointer">
                      {project.name}
                    </h2>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <p className="text-gray-700 mb-4">{project.startDate}</p>
                    <button
                      type="button"
                      className="w-full py-3 font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
                    >
                      complain
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
