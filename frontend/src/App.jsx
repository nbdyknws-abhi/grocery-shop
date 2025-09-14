import { Routes, Route } from "react-router-dom";
import CombinedSignup from "./pages/CombinedSignup"; // ✅ changed
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderForm from "./pages/OrderForm";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";

// Combined login page
import CombinedLogin from "./pages/CombinedLogin";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="container mt-4">
        <Routes>
          {/* User Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <OrderForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          {/* Combined Auth Routes */}
          <Route path="/login" element={<CombinedLogin />} />
          <Route path="/signup" element={<CombinedSignup />} />{" "}
          {/* ✅ updated */}
          {/* Admin Route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Page Not Found</h2>
                <p className="text-muted">Looks like you're lost 🧭</p>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
