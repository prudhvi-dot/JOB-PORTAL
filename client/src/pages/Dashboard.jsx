import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setPersistToken, CompanyLoading, setCompanyData } =
    useContext(Appcontext);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/company/logout");

      if (data.success) {
        toast.success(data.message);
      }

      localStorage.removeItem("persist");
      setPersistToken(null);
      setCompanyData(null);

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if (CompanyLoading) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="'min-h-screen">
        <div className="shadow py-4">
          <div className="px-5 flex justify-between items-center">
            <img
              onClick={() => navigate("/")}
              className="max-sm:w-32 cursor-pointer"
              src={assets.logo}
              alt=""
            />
            {companyData && (
              <div className="flex items-center gap-3">
                <p className="max-sm:hidden">Welcome {companyData.name}</p>

                <div className="relative group cursor-pointer">
                  <img
                    className="w-8 h-8 border rounded-full cursor-pointer"
                    src={companyData.image}
                    alt=""
                  />
                  <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                    <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                      <li
                        onClick={handleLogout}
                        className="py-1 px-2 cursor-pointer pr-10"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <div className="inline-block min-h-screen border-r-2">
            <ul className="flex flex-col items-start pt-5 text-gray-800">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/dashboard"}
              >
                <img className="min-w-4" src={assets.add_icon} alt="" />
                <p className="max-sm:hidden">Add Job</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/dashboard/manage-jobs"}
              >
                <img className="min-w-4" src={assets.home_icon} alt="" />
                <p className="max-sm:hidden">Manage Jobs</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/dashboard/view-applications"}
              >
                <img className="min-w-4" src={assets.person_tick_icon} alt="" />
                <p className="max-sm:hidden">View Applications</p>
              </NavLink>
            </ul>
          </div>

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
