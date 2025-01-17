import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import connectCloudinary from "./config/cloudinary.js";
import companyRoutes from "./routes/companyRoutes.js";
import cookieParser from "cookie-parser";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
connectCloudinary();
const app = express();
app.use(cookieParser());
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first sentry error");
});

app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
