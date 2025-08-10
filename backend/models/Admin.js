import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // ✅ Required for hashing
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // optional: adds createdAt & updatedAt
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


export default mongoose.model("Admin", adminSchema);
