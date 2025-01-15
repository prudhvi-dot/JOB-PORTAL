import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJobs from "./pages/ApplyJobs";
import MainLayout from "./components/layout/MainLayout";
import RecruiterLogin from "./components/RecruiterLogin";
import { useContext } from "react";
import { Appcontext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Addjob from "./pages/Addjob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applyjob/:id" element={<ApplyJobs />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="add-job" element={<Addjob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="view-applications" element={<ViewApplications />} />
      </Route>
    </>
  )
);
function App() {
  const { showRecruiterLogin } = useContext(Appcontext);
  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
