import SignupForm from "../components/SignupForm";
import "../styles/authpages.css";

// Optional: framer-motion animation (if you want to add later)
// import { motion } from "framer-motion";

const Signup = () => {
  return (
    <div className="auth-page signup-bg">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h3 className="fw-bold">🛒 Grocery App</h3>
          <p>Create your account to start shopping</p>
        </div>

        {/* Signup form */}
        <SignupForm />

        {/* Login redirect link */}
        <p className="mt-4 text-center" style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a href="/login" className="text-warning fw-bold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
