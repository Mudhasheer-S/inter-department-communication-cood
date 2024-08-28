import { useState } from "react";

import "./App.css";

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AllDepartments from "./components/AllDepartments";
import DepartmentProjects from "./components/DepartmentProjects";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

import ChoosePlacePage from "./components/ChoosePlacePage";
import AllProjectsPage from "./components/AllProjectsPage";
import PostProjectForm from "./components/PostProjectForm";
import MyDepartment from "./components/MyDepartment";
import Register from "./components/Register";
import Login from "./components/Login";
import ForumPage from "./pages/ForumPage";
import Intersectdept from "./components/Intersectdept";
import IntersectDetails from "./components/IntersectDetails";
import ProjectManagerLogin from "./components/projectManager/projectManagerLogin";


function App() {

  const MainLayout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  return (
    <>
   
    


      {/* <Register/> */}

      {/* <Login/> */}
      {/* <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alldepartment" element={<AllDepartments />} />       
       
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/postProject" element={<PostProjectPage/>}/>
        <Route path="/mydepartment" element={<MyDepartment />} />
        <Route path="/post-project" element={<PostProjectForm />} />
        <Route path="/choose-location" element={<ChoosePlacePage />} />
        <Route path="/all-projects" element={<AllProjectsPage />} />
        <Route path="/interdepartment" element={<ForumPage />} />
      </Routes>
    </Router> */}

    <Router>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/project-manager-login" element={<ProjectManagerLogin />} />

       
        <Route element={<MainLayout />}>
          <Route path="/head/alldepartment" element={<AllDepartments />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/mydepartment" element={<MyDepartment />} />
          <Route path="/post-project" element={<PostProjectForm />} />
          <Route path="/choose-location" element={<ChoosePlacePage />} />
          <Route path="/all-projects" element={<AllProjectsPage />} />
          <Route path="/interdepartment" element={<ForumPage />} />
          <Route path="/intersectDept" element={<Intersectdept />} />
          <Route path="/intersectDetails/:id" element={<IntersectDetails />} />
        </Route>
      </Routes>
    </Router>


     
    </>
  );
}

export default App;
