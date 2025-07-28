// pages/AdminSignup.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AdminSignupForm from "../components/AdminSignupForm";
import "../styles/authpages.css";

const AdminSignup = () => {
  return (
    <div className="auth-page enhanced-bg">
      {/* 🌙 Dark Mode Toggle */}
      <div className="dark-toggle-container top-right">
        <button
          className="dark-toggle"
          onClick={() => document.body.classList.toggle("dark-mode")}
        >
          🌓 Toggle Dark Mode
        </button>
      </div>

      {/* 🔐 Admin Banner */}
      <div className="store-stamp">👑 Admin Panel – Chakraborty Grocery</div>

      {/* ✨ Promotional cards reused */}
      <div className="promo-card promo-left"><h6>🛠 Admin Access</h6><p>Manage users and control data</p></div>
      <div className="promo-card promo-right"><h6>📊 Dashboard</h6><p>Track all activities</p></div>
      <div className="promo-card promo-left promo-2"><h6>🔒 Secure</h6><p>Admin-only portal</p></div>

      {/* 📝 Admin Signup Form */}
      <motion.div
        className="auth-card p-4 shadow-lg hover-glow"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="text-center mb-4">
          <motion.h2
            className="fw-bold text-danger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Admin Registration
          </motion.h2>
          <motion.p
            className="text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create an admin account to control users and orders 🛠
          </motion.p>
        </div>

        <AdminSignupForm />

        <div className="text-center mt-4">
          <p className="text-muted">
            Already an admin?{" "}
            <motion.a
              href="/admin-login"
              className="text-danger fw-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Login here
            </motion.a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignup;
