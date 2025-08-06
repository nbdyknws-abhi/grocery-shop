import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/payment/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders!");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-warning",
      confirmed: "bg-info",
      processing: "bg-primary",
      shipped: "bg-secondary",
      delivered: "bg-success",
      cancelled: "bg-danger",
    };
    return badges[status] || "bg-secondary";
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      pending: "bg-warning",
      paid: "bg-success",
      failed: "bg-danger",
    };
    return badges[status] || "bg-secondary";
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders 📋</h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">No orders found</h4>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Order #{order._id.slice(-8)}</span>
                  <span
                    className={`badge ${getStatusBadge(order.orderStatus)}`}
                  >
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>Date:</strong>
                      <br />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <div className="col-6">
                      <strong>Total:</strong>
                      <br />₹{order.totalAmount}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>Payment:</strong>
                      <br />
                      <span className="text-capitalize">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="col-6">
                      <strong>Status:</strong>
                      <br />
                      <span
                        className={`badge ${getPaymentStatusBadge(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <strong>Items:</strong>
                    <ul className="list-unstyled mt-2">
                      {order.orderItems.map((item, index) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between"
                        >
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-3">
                    <strong>Delivery Address:</strong>
                    <br />
                    <small className="text-muted">
                      {order.customerInfo.name}
                      <br />
                      {order.customerInfo.phone}
                      <br />
                      {order.customerInfo.address}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
