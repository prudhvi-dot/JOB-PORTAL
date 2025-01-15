import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();
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
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hdden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {job.applicants}
                </td>
                <td>
                  <input className="scale-125 ml-4" type="checkbox" />
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
