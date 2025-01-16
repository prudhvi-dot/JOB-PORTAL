import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
dotenv.config();

const app = express();
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

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
