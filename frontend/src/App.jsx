import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderForm from "./pages/OrderForm"; // ✅ Import your checkout form
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />

      {/* ✅ Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* ✅ Bootstrap layout wrapper */}
      <div className="container mt-4">
        <Routes>
          {/* ✅ Protected homepage */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ✅ Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Protected cart page */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* ✅ New: Protected checkout page */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <OrderForm />
              </ProtectedRoute>
            }
          />

          {/* ✅ 404 fallback */}
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
