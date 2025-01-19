import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("JobApplication", jobApplicationSchema);
