import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  lastname: {
    type: String,
    required: [true, "Last Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLenght: [8, "Password must be at least 8 characters"],
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
