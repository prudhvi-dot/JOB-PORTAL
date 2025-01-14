import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";

function Header() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(Appcontext);
  return (
    <div className="shadow py-4 lg:px-4 sticky top-0 bg-white z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          className="cursor-pointer"
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
        />
        {user ? (
          <div className="flex items-center gap-3">
            <Link className="max-sm:text-sm" to="/applications">
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) =>
                openSignIn({
                  appearance: {
                    variables: {
                      colorPrimary: "#2563EB",
                      colorTextPrimary: "#2563EB",
                    },
                  },
                })
              }
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
