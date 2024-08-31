import { useState } from "react";

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
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
import ProjectManagerDashboard from "./components/projectManager/projectManagerDashboard";
import ProjectMnagerResources from "./components/projectManager/projectMnagerResources";
import SiteEngineerHome from "./components/sitengineer/siteEngineerHome";
import DailyProgressReport from "./components/sitengineer/DailyProgressReport";
import PublicDepts from "./components/public/PublicDepts";
import PublicReport from "./components/public/publicReport";
import SiteEngineerHome from "./components/sitengineer/siteEngineerHome";
import DailyProgressReport from "./components/sitengineer/DailyProgressReport";

function App() {
  // const MainLayout = () => {
  //   return (
  //     <div>
  //       <Navbar />
  //       <Outlet />
  //     </div>
  //   );
  // };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/project-manager-login"
            element={<ProjectManagerLogin />}
          />
          <Route
            path="/project-manager"
            element={<ProjectManagerDashboard />}
          />
          <Route
            path="/project-manager-resources"
            element={<ProjectMnagerResources />}
          />
          <Route path="/head/alldepartment" element={<AllDepartments />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/mydepartment" element={<MyDepartment />} />
          <Route path="/post-project" element={<PostProjectForm />} />
          <Route path="/choose-location" element={<ChoosePlacePage />} />
          <Route path="/all-projects" element={<AllProjectsPage />} />
          <Route path="/interdepartment" element={<ForumPage />} />
          <Route path="/intersectDept" element={<Intersectdept />} />
          <Route path="/show-depts" element={<PublicDepts />} />
          <Route path="/public" element={<PublicReport />} />
          <Route path="/intersectDetails/:id" element={<IntersectDetails />} />

          <Route
            path="/siteEngineer/alldepartment"
            element={<SiteEngineerHome />}
          />
          <Route
            path="/siteEngineer/report"
            element={<DailyProgressReport />}
          />

          <Route
            path="/siteEngineer/alldepartment"
            element={<SiteEngineerHome />}
          />
          <Route
            path="/siteEngineer/report"
            element={<DailyProgressReport />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
