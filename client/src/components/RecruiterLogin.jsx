import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const RecruiterLogin = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [image, setImage] = useState(false);

  const { setCompanyData, setPersistToken } = useContext(Appcontext);

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (state === "signup" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted("true");
    }

    try {
      if (state == "login") {
        const { data } = await axios.post("/api/company/login", {
          email: formData.email,
          password: formData.password,
        });

        if (data.success) {
          setCompanyData(data.company);
          const persist = Cookies.get("persistJWT");
          setPersistToken(persist);
          localStorage.setItem("persist", persist);
          navigate("/dashboard");
          toast.success("Login successful");
        }
      } else {
        const formdata = new FormData();
        formdata.append("name", formData.name);
        formdata.append("email", formData.email);
        formdata.append("password", formData.password);
        formdata.append("image", image);

        const { data } = await axios.post("api/company/register", formdata);

        if (data.success) {
          setCompanyData(data.company);
          const persist = Cookies.get("persistJWT");
          setPersistToken(persist);
          localStorage.setItem("persist", persist);
          navigate("/dashboard");
          toast.success("Registration successful");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const navigate = useNavigate();
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

        {loading ? (
          <span className="inset-0 flex items-center justify-center">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 border-t-transparent"></span>
          </span>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-2 rounded-full mt-1.5"
          >
            {state === "login"
              ? loading
                ? "loading..."
                : "login"
              : isTextDataSubmitted
              ? loading
                ? "loading..."
                : "Create Account"
              : loading
              ? "loading..."
              : "next"}
          </button>
        )}

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
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
