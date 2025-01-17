import jobModel from "../models/jobModel.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({ visible: true }).populate({
      path: "company",
      select: "-password",
    });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ succes: false, error: "Internal server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findById(id).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      return res.status(404).json({ succes: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
