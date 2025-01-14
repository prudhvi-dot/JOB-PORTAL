import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "signup" && !isTextDataSubmitted) {
      setIsTextDataSubmitted("true");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const { setShowRecruiterLogin } = useContext(Appcontext);

  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-small">Welcome back! Please sign in to continue</p>
        {state === "signup" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="logo">
                <img
                  className="w-16 h-16 rounded-full cursor-pointer"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                type="file"
                id="logo"
                hidden
              />
              <p>Upload company logo</p>
            </div>
          </>
        ) : (
          <>
            {state !== "login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none"
                  onChange={handleOnChange}
                  type="text"
                  value={formData.name}
                  name="name"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none"
                onChange={handleOnChange}
                type="email"
                value={formData.email}
                name="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none"
                onChange={handleOnChange}
                type="password"
                value={formData.password}
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "login" && (
          <p className="text-sm text-blue-500 my-4 cursor-pointer">
            Forgot Password?
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-1.5"
        >
          {state === "login"
            ? "login"
            : isTextDataSubmitted
            ? "create account"
            : "next"}
        </button>

        {state === "login" ? (
          <p>
            Dont't have an account?{" "}
            <span
              className="cursor-pointer text-blue-500"
              onClick={() => setState("signup")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-500"
              onClick={() => setState("login")}
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
