import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserSchemaDocument } from "./user.js";

const userSchema = new mongoose.Schema<UserSchemaDocument>({
  profileImg: { type: String, default: "" },
  userName: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    require: true,
  },
});

// Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update: { password?: string } = this.getUpdate() as any;

  if (!update.password) {
    // If the password is not being modified, move to the next middleware
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.password, salt);

    update.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Custom Function
userSchema.methods.matchPassword = async function (
  currentPassword: string
): Promise<boolean> {
  return await bcrypt.compare(currentPassword, this.password);
};

export default mongoose.model("users", userSchema);
