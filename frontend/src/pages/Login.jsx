// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";
import "../styles/authpages.css";

const Login = () => {
  return (
    <div className="auth-page login-bg">
      <motion.div
        className="auth-card p-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <i className="bi bi-person-circle text-light" style={{ fontSize: "3rem" }}></i>
          </motion.div>
          <h2 className="fw-bold text-white mt-2">Welcome Back!</h2>
          <p className="text-light mb-1" style={{ fontSize: "0.95rem" }}>
            Login to continue managing your groceries
          </p>
        </div>

        <LoginForm />

        <div className="text-center mt-4">
          <p className="text-light" style={{ fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            <a href="/signup" className="text-info fw-semibold">
              Sign up here
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
