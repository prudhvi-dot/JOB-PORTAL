import JWT from "jsonwebtoken";
import companyModel from "../models/companyModel.js";

const authorize = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;

    if (!jwt) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: No token provided" });
    }

    const payload = JWT.verify(jwt, process.env.JWT_SECRET);

    if (!payload) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: Invalid token" });
    }

    const company = await companyModel.findById(payload.id).select("-password");

    if (!company) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: User not found" });
    }

    req.company = company;

    next();
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: Token expired" });
    }
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default authorize;
