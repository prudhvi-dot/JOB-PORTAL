import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontext } from "../context/AppContext";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { persistToken } = useContext(Appcontext);
  const [jobs, setJobs] = useState([]);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading for each job

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get("/api/company/list-jobs");

      if (data.success) {
        setJobs(data.jobs.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeVisibility = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true })); // Set loading for specific job
    try {
      const { data } = await axios.post("/api/company/change-visibility", {
        id,
      });

      if (data.success) {
        await fetchCompanyJobs(); // Refresh the job list
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false })); // Reset loading for specific job
    }
  };

  useEffect(() => {
    if (persistToken) {
      fetchCompanyJobs();
    }
  }, [persistToken]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-small">
          <thead>
            <tr>
              <th className="my-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="my-2 px-4 border-b text-left">Job Title</th>
              <th className="my-2 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="my-2 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="my-2 px-4 border-b text-center">Applications</th>
              <th className="my-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b relative">
                  {loadingStates[job._id] ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 border-t-transparent"></span>
                    </span>
                  ) : (
                    <input
                      onChange={() => changeVisibility(job._id)}
                      className="scale-125 ml-4"
                      type="checkbox"
                      checked={job.visible}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="bg-black text-white py-2 px-4 rounded"
          >
            Add new job
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
