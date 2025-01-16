import mongoose from "mongoose";
import bcrypt from "bcrypt";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requred: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

companySchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

export default mongoose.model("Company", companySchema);
