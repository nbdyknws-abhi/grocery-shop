import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]); // <-- Add orders state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Order fetch error:", err);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Start editing user
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };

  // Save updated user
  const handleUpdate = async (userId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        { name: editedName, email: editedEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, ...res.data } : user
        )
      );
      setEditUserId(null);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders(); // <-- Fetch orders on mount
  }, []);

  // Helper to get orders for a user
  const getUserOrders = (userId) =>
    orders.filter((order) => order.userId && order.userId._id === userId);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard - All Users</h2>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered On</th>
              <th>Orders</th> {/* Add Orders column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  {/* Show user's orders */}
                  {getUserOrders(user._id).length === 0 ? (
                    <span className="text-muted">No orders</span>
                  ) : (
                    <ul style={{ paddingLeft: "1rem", marginBottom: 0 }}>
                      {getUserOrders(user._id).map((order) => (
                        <li key={order._id}>
                          {order.orderItems.map((item) => (
                            <span key={item.name}>
                              {item.name} x{item.quantity} (₹{item.price}){" "}
                            </span>
                          ))}
                          <br />
                          <small>
                            Status: {order.orderStatus}, Payment: {order.paymentStatus}
                          </small>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdate(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditUserId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;