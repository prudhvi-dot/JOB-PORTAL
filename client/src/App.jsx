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
  return <RouterProvider router={router} />;
}

export default App;
