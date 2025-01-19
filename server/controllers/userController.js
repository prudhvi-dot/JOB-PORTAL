import jobApplicationModel from "../models/jobApplicationModel.js";
import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;

  const userId = req.auth.userId;

  try {
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(400).json({ success: false, error: "job not found" });
    }
    const isAlreadyApplied = await jobApplicationModel.findOne({
      jobId,
      userId,
    });

    if (isAlreadyApplied) {
      return res.status(409).json({ success: false, error: "Already Applied" });
    }

    const newApplication = await jobApplicationModel.create({
      userId,
      company: job.company,
      jobId,
      date: Date.now(),
    });

    res.status(200).json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Error in Apply controller" });
  }
};

export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await jobApplicationModel
      .find({ userId })
      .populate({
        path: "company",
        select: "-password",
      })
      .populate({
        path: "jobId",
        select: "title location description level category salary",
      });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await userModel.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);

      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    res.status(200).json({ success: true, message: "Resume Uploaded" });
  } catch (error) {
    {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
};
