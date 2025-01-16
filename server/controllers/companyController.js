import Company from "../models/companyModel.js";
import { v2 as cloudinary } from "cloudinary";
import generateJWT from "../utils/generateJWT.js";
import jobModel from "../models/jobModel.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res
      .status(400)
      .json({ success: false, error: "All fields required" });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({
        success: false,
        error: "Company already registered",
      });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password,
      image: imageUpload.secure_url,
    });

    generateJWT(res, company._id);
    company.password = null;

    res.json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "All fields required" });
  }
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }
    const isMatch = await company.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    generateJWT(res, company._id);
    company.password = null;

    res
      .status(200)
      .json({ success: true, message: "Login successful", company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyData = async (req, res) => {};

export const postJob = async (req, res) => {
  const { title, salary, description, location, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const newJob = await jobModel.create({
      title,
      salary,
      description,
      location,
      company: companyId,
      category,
      date: Date.now(),
      level,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCompanyJobApplicants = async (req, res) => {};

export const getCompanyPostedJobs = async (req, res) => {};

export const changeJobApplicationStatus = async (req, res) => {};

export const changeVisibility = async (req, res) => {};
