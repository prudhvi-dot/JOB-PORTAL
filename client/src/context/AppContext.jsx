import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth, useUser } from "@clerk/clerk-react";

export const Appcontext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [persistToken, setPersistToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [CompanyLoading, setCompanyLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get("/api/jobs");

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompanyData = async () => {
    try {
      if (persistToken) {
        const { data } = await axios.get("/api/company/company");

        if (data.success) {
          setCompanyData(data.company);
        }
      }
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setCompanyLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData((prev) => ({ ...prev, ...data.user }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/users/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplications(data.applications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    const token = Cookies.get("persistJWT") || localStorage.getItem("persist");
    if (token) {
      setPersistToken(token);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (persistToken) {
      fetchCompanyData();
    } else {
      setCompanyData(null);
      setCompanyLoading(false);
    }
  }, [persistToken]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    companyData,
    setCompanyData,
    loading,
    setLoading,
    CompanyLoading,
    persistToken,
    setPersistToken,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };

  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};
