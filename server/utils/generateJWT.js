import jwt from "jsonwebtoken";

const generateJWT = async (res, id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

export default generateJWT;
