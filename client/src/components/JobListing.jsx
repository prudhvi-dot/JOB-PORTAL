import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, setIsSearched, jobs } =
    useContext(Appcontext);
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategorychange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleLocationchange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const CategoriesMatch = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const LocationsMatch = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
    const TitleMatch = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const LocationMatch = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs.filter((job) => {
      return (
        CategoriesMatch(job) &&
        LocationsMatch(job) &&
        TitleMatch(job) &&
        LocationMatch(job)
      );
    });

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [selectedCategories, selectedLocations, searchFilter, jobs]);

  return (
    <div className="container mx-auto lg:px-20 flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      <div className="w-full lg:w-1/4 bg-white px-4">
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    onClick={(e) => {
                      setSearchFilter((prev) => ({ ...prev, title: "" }));
                    }}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() => {
                      setSearchFilter((prev) => ({ ...prev, location: "" }));
                    }}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              )}
            </div>
          </>
        )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray=600">
            {JobCategories.map((category, index) => {
              return (
                <li className="flex gap-3 items-center" key={index}>
                  <input
                    className="scale-125"
                    type="checkbox"
                    onChange={(e) => handleCategorychange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
          <ul className="space-y-4 text-gray=600">
            {JobLocations.map((location, index) => {
              return (
                <li className="flex gap-3 items-center" key={index}>
                  <input
                    className="scale-125"
                    type="checkbox"
                    onChange={() => handleLocationchange(location)}
                    checked={selectedLocations.includes(location)}
                  />
                  {location}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                src={assets.left_arrow_icon}
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage((prev) => index + 1)}
                    className={`w-10 h-10 items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(filteredJobs.length / 6))
                  )
                }
                src={assets.right_arrow_icon}
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
