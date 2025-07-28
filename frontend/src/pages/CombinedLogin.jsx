/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";
import AdminLoginForm from "../components/AdminLoginForm";
import "../styles/authpages.css";

const CombinedLogin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // ✅ Auto-redirect after login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      isAdmin ? navigate("/admin/dashboard") : navigate("/");
    }
  }, [isAdmin]);

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

      {/* 🛒 Store Stamp */}
      <div className="store-stamp">Another Time!!!!! Chakraborty Grocery Shop</div>

      {/* ✨ Side Promo Cards */}
      <div className="promo-card promo-left"><h6>🍞 Fresh Bakery</h6><p>Daily baked goods</p></div>
      <div className="promo-card promo-right"><h6>🥬 Organic Greens</h6><p>Farm to plate</p></div>
      <div className="promo-card promo-left promo-2"><h6>🧴 Essentials</h6><p>Daily needs</p></div>
      <div className="promo-card promo-right promo-2"><h6>🍎 Fruits</h6><p>Fresh and juicy</p></div>
      <div className="promo-card promo-left promo-3"><h6>📦 Fast Delivery</h6><p>Same-day shipping</p></div>
      <div className="promo-card promo-right promo-3"><h6>🎁 Rewards</h6><p>Earn while you shop</p></div>

      {/* ✨ Auth Card */}
      <motion.div
        className="auth-card p-4 shadow-lg hover-glow"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* 🔁 Role Toggle Segment */}
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
              className={`btn btn-sm ${isAdmin ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setIsAdmin(true)}
            >
              🔐 Admin
            </button>
          </div>
        </div>

        <div className="text-center mb-4">
          <motion.h2
            className={`fw-bold ${isAdmin ? "text-primary" : "text-success"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isAdmin ? "Admin Portal Login" : "Welcome Back to Your Grocery World!"}
          </motion.h2>
          <motion.p
            className="text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isAdmin
              ? "Sign in to manage users and inventory"
              : "Sign in and get your fresh picks today 🍏"}
          </motion.p>
        </div>

        {!isAdmin && (
          <div className="blog-cards mb-4">
            <div className="blog-card"><h6>💡 Smart Tip</h6><p>Get weekly deals directly to your inbox by staying logged in.</p></div>
            <div className="blog-card"><h6>🍎 Fresh Pick</h6><p>Login to unlock today’s exclusive fruits & veggies offers.</p></div>
          </div>
        )}

        {/* Login Form Rendering */}
        {isAdmin ? <AdminLoginForm /> : <LoginForm />}

        {!isAdmin && (
          <div className="text-center mt-4">
            <p className="text-muted">
              New here?{" "}
              <motion.a
                href="/signup"
                className="text-success fw-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Sign up now
              </motion.a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CombinedLogin;