import { useState } from "react";
import AdminLoginForm from "../components/AdminLoginForm";
import "../styles/authpages.css"; // Optional: for styled background

const AdminLogin = () => {
  // eslint-disable-next-line no-unused-vars
  const [showUserLogin, setShowUserLogin] = useState(false); // Toggle if needed

  return (
    <div className="auth-page d-flex align-items-center justify-content-center vh-100">
      <div className="auth-card p-4 shadow rounded bg-light" style={{ width: "350px" }}>
        <h2 className="text-center fw-bold mb-4 text-primary">Admin Login</h2>
        <AdminLoginForm />
        <div className="text-center mt-3">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => setShowUserLogin(true)}
          >
            Not an Admin? Go to User Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
