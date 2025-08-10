// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// 🧩 Import routes
import authRoutes from "./routes/authRoutes.js";
import groceryRoutes from "./routes/groceryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// 🛡️ Optional: Import hash utility if needed globally
// import { hashPassword } from "./utils/hash.js";

dotenv.config();
connectDB();

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🚀 Routes
app.use("/api/auth", authRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// 🟢 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});