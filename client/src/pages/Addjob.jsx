import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Addjob = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "Banglore",
    category: "Programming",
    level: "Beginer level",
    salary: 0,
  });

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post("/api/company/postJob", {
        ...formData,
        description,
      });

      // console.log(data);

      if (data.success) {
        toast.success("added successfully");
        console.log(data);
        setFormData({
          title: "",
          location: "Banglore",
          category: "Programming",
          level: "Beginer level",
          salary: 0,
        });
        quillRef.current.root.innerHTML = "";
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex- flex-col items-start gap-3"
    >
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded outline-none"
          onChange={handleOnChange}
          name="title"
          value={formData.title}
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full max-w-lg mb-2">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm-gap-8">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={handleOnChange}
            name="category"
          >
            {JobCategories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={handleOnChange}
            name="location"
          >
            {JobLocations.map((location, index) => (
              <option value={location} key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={handleOnChange}
            name="level"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2">Salary</p>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          min={0}
          onChange={handleOnChange}
          type="Number"
          placeholder="2500"
        />
      </div>
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded"
      >
        Add
      </button>
    </form>
  );
};

export default Addjob;
