import React from "react";
import { useState} from "react";
import { useDispatch } from 'react-redux';
import { setProjectManagerId, setProjectManagerName } from '../../Redux/projectManagerSlice';
import { setDepartmentId, setDepartmentName, setDepartmentLocation, setDepartmentRole } from '../../Redux/departmentSlice';
import axios from "axios";
import ugov from "../../assets/urban_gov.png";
import { useNavigate } from "react-router-dom";


export default function ProjectManagerLogin() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/projectManagerLogin",
        formData
      );
      if (response.status === 200) {
        const projectManagerId = response.data.split("#")[0].trim();
        const projectManagerName = response.data.split("#")[1].trim();

        dispatch(setProjectManagerId(projectManagerId));
        dispatch(setProjectManagerName(projectManagerName));
        
        console.log(projectManagerId);
        console.log(projectManagerName);
        setMessage("Login Successful.");
        navigate("/project-manager");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center">
          <div className="w-1/2 p-3 sm:p-10">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Project Manager Sign In</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign In with e-mail
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign In</span>
                    </button>
                  </form>
                  {message && (
                    <p className="mt-6 text-xs text-red-600 text-center">
                      {message}
                    </p>
                  )}

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by our
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-[730px] flex justify-center items-center">
            <div className="w-full h-full">
              <img
                src={ugov}
                alt="ugov"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
