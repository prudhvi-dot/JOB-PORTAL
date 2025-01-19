import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJobs from "./pages/ApplyJobs";
import MainLayout from "./components/layout/MainLayout";
import RecruiterLogin from "./components/RecruiterLogin";
import { Appcontext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Addjob from "./pages/Addjob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation(); // Get current location

  const { persistToken, loading } = useContext(Appcontext);

  // Check if the current route is the dashboard
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  if (loading) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      {!isDashboardRoute && <MainLayout />}{" "}
      {/* Render MainLayout only if not on dashboard */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applyjob/:id" element={<ApplyJobs />} />
        <Route
          path="/recruiter-login"
          element={
            !persistToken ? <RecruiterLogin /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/dashboard"
          element={persistToken ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<Addjob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
}

// Wrap the App component with Router in the main entry point (index.js)
export default App;
