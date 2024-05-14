import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a email."],
      unique: true,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordtoken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },

  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
