/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import SignupForm from "../components/SignupForm";
import AdminSignupForm from "../components/AdminSignupForm";
import { useNavigate } from "react-router-dom";
import "../styles/authpages.css";

const CombinedSignup = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    isAdmin ? navigate("/admin/dashboard") : navigate("/");
  };

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

      {/* 🏷 Branding */}
      <div className="store-stamp">
        {isAdmin ? "👑 Admin Panel – Chakraborty Grocery" : "Chakraborty Grocery Shop"}
      </div>

      {/* ✨ Promo Cards */}
      {isAdmin ? (
        <>
          <div className="promo-card promo-left"><h6>🛠 Admin Access</h6><p>Manage users and control data</p></div>
          <div className="promo-card promo-right"><h6>📊 Dashboard</h6><p>Track all activities</p></div>
          <div className="promo-card promo-left promo-2"><h6>🔒 Secure</h6><p>Admin-only portal</p></div>
        </>
      ) : (
        <>
          <div className="promo-card promo-left"><h6>🍞 Fresh Bakery</h6><p>Daily baked goods</p></div>
          <div className="promo-card promo-right"><h6>🥬 Organic Greens</h6><p>Farm to plate</p></div>
          <div className="promo-card promo-left promo-2"><h6>🧴 Essentials</h6><p>Daily needs</p></div>
          <div className="promo-card promo-right promo-2"><h6>🍎 Fruits</h6><p>Fresh and juicy</p></div>
          <div className="promo-card promo-left promo-3"><h6>📦 Fast Delivery</h6><p>Same-day shipping</p></div>
          <div className="promo-card promo-right promo-3"><h6>🎁 Rewards</h6><p>Earn while you shop</p></div>
        </>
      )}

      {/* 📝 Auth Card */}
      <motion.div
        className="auth-card p-4 shadow-lg hover-glow"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* 🔁 Role Toggle - segmented button design */}
        <div className="d-flex justify-content-end mb-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${!isAdmin ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setIsAdmin(false)}
            >
              👤 User
            </button>
            <button
              type="button"
              className={`btn btn-sm ${isAdmin ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setIsAdmin(true)}
            >
              🔐 Admin
            </button>
          </div>
        </div>

        <div className="text-center mb-4">
          <motion.h2
            className={`fw-bold ${isAdmin ? "text-danger" : "text-success"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isAdmin ? "Admin Registration" : "Join the Fresh Side!"}
          </motion.h2>
          <motion.p
            className="text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isAdmin
              ? "Create an admin account to control users and orders 🛠"
              : "Create your grocery account today 🛒"}
          </motion.p>
        </div>

        {!isAdmin && (
          <div className="blog-cards mb-4">
            <div className="blog-card">
              <h6>🚀 Easy Ordering</h6>
              <p>Sign up and start shopping in just 2 minutes!</p>
            </div>
            <div className="blog-card">
              <h6>🎁 Member Rewards</h6>
              <p>Earn points & get discounts with every order.</p>
            </div>
          </div>
        )}

        {/* Form Switch */}
        {isAdmin ? (
          <AdminSignupForm onSuccess={handleSignupSuccess} />
        ) : (
          <SignupForm onSuccess={handleSignupSuccess} />
        )}

        {/* Link to Login */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Already registered?{" "}
            <motion.a
              href="/login"
              className={isAdmin ? "text-danger fw-bold" : "text-success fw-bold"}
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

export default CombinedSignup;