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
import ProfilePage from "./pages/Profile";
import RecruiterLogin from "./components/RecruiterLogin";
import { useContext } from "react";
import { Appcontext } from "./context/AppContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/applyjob/:id" element={<ApplyJobs />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
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
