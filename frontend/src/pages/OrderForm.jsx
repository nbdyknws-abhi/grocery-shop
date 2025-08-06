import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const { cartItems, clearCart, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  // Calculate total price
  const totalPrice = getTotalPrice();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create order on backend
      const orderResponse = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: totalPrice,
          receipt: `order_${Date.now()}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { order, key_id } = orderResponse.data;

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Grocery Shop",
        description: "Payment for grocery items",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  items: cartItems,
                  customerInfo: formData,
                  totalAmount: totalPrice,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (verifyResponse.data.success) {
              toast.success("Payment successful! Order placed.");
              clearCart();
              navigate("/");
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (formData.paymentMethod === "cod") {
      // Handle COD
      handleCODOrder();
    } else if (formData.paymentMethod === "razorpay") {
      // Handle Razorpay payment
      handlePayment();
    } else {
      toast.info("Payment method coming soon!");
    }
  };

  const handleCODOrder = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/payment/cod-order",
        {
          orderDetails: {
            items: cartItems,
            customerInfo: formData,
            totalAmount: totalPrice,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully with Cash on Delivery!");
        clearCart();
        navigate("/");
      } else {
        toast.error("Failed to place order!");
      }
    } catch (error) {
      console.error("COD order error:", error);
      toast.error("Failed to place order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Place Your Order 🛒</h2>

      {/* Order Summary */}
      <div className="row">
        <div className="col-md-8">
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-light rounded shadow-sm"
          >
            <h5 className="mb-3">Delivery Information</h5>

            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-control"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery Address *</label>
              <textarea
                className="form-control"
                required
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter your complete address"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select
                className="form-select"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
              >
                <option value="cod">Cash on Delivery</option>
                <option value="razorpay">Pay Online (Razorpay)</option>
                <option value="upi">UPI (Coming Soon)</option>
                <option value="card">Credit/Debit Card (Coming Soon)</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processing...
                </>
              ) : formData.paymentMethod === "cod" ? (
                "Place Order (COD)"
              ) : formData.paymentMethod === "razorpay" ? (
                `Pay ₹${totalPrice} with Razorpay`
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h5 className="mb-3">Order Summary</h5>

            {cartItems.length === 0 ? (
              <p className="text-muted">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span className="text-truncate">
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="mt-3 text-muted small">
                  <p className="mb-1">💰 Secure payments</p>
                  <p className="mb-1">🚚 Fast delivery</p>
                  <p className="mb-0">📞 24/7 support</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
