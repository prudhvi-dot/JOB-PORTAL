import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  logout,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import authorize from "../middlewares/Authorize.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);

router.post("/login", loginCompany);
router.post("/logout", logout);

router.get("/company", authorize, getCompanyData);

router.post("/postJob", authorize, postJob);

router.get("/applicants", authorize, getCompanyJobApplicants);

router.get("/list-jobs", authorize, getCompanyPostedJobs);

router.post("/change-status", authorize, changeJobApplicationStatus);

router.post("/change-visibility", authorize, changeVisibility);

export default router;
