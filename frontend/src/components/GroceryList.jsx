import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useCart } from "../context/useCart";
import "../components/grocery.css";

// Images
import milk from "../assets/milk.jpeg";
import bread from "../assets/bread.jpeg";
import eggs from "../assets/eggs.jpeg";
import salt from "../assets/salt.jpeg";
import maggie from "../assets/maggie.jpeg";
import cornflakes from "../assets/cornflakes.jpeg";
import tomato from "../assets/tomato.jpeg";
import oreo from "../assets/oreo.jpeg";
import bourboan from "../assets/bourboan.jpeg";
import mariegold from "../assets/mariegold.jpeg";
import onion from "../assets/onion.jpeg";
import garlic from "../assets/garlic.jpeg";
import darkfantasy from "../assets/darkfantasy.jpeg";
import dabur from "../assets/dabur.jpeg";
import indiagate from "../assets/indiagate.jpeg";
import closeup from "../assets/closeup.jpeg";

// Video
import bgVideo from "../assets/grocery-bg.mp4";

const fallbackImages = {
  milk,
  bread,
  eggs,
  salt,
  maggie,
  cornflakes,
  tomato,
  oreo,
  bourboan,
  mariegold,
  onion,
  garlic,
  darkfantasy,
  dabur,
  indiagate,
  closeup,
};

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    price: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const { addToCart } = useCart();
  const baseURL = import.meta.env.VITE_API_URL;

  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/groceries`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  }, [baseURL]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${baseURL}/groceries/${editId}`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
      } else {
        await axios.post(`${baseURL}/groceries`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
      }
      setFormData({ name: "", quantity: 1, price: 0 });
      setIsEditing(false);
      setEditId(null);
      fetchItems();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    });
    setIsEditing(true);
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setFormData({ name: "", quantity: 1, price: 0 });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <>
      {/* 🎥 Hero */}
      <div className="hero-container">
        <video autoPlay muted loop className="hero-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="overlay">
          <h1 className="display-4 fw-bold text-white">Fresh Groceries Daily</h1>
          <p className="lead text-white">Add, edit, and manage your grocery items easily.</p>
        </div>
      </div>

      {/* 🧾 Form */}
      <div className="container py-5">
        <h3 className="text-center mb-4 fw-semibold">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h3>
        <form
          className="row g-3 mb-5 bg-white p-4 rounded shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="col-md-4">
            <input
              name="name"
              placeholder="Item name"
              className="form-control"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="form-control"
              onChange={handleChange}
              value={formData.quantity}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              name="price"
              type="number"
              placeholder="Price (₹)"
              className="form-control"
              onChange={handleChange}
              value={formData.price}
              required
            />
          </div>
          <div className="col-md-2 d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">
              {isEditing ? "Update" : "Add"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* 🛍️ Items */}
        <h3 className="text-center mb-4 fw-semibold">Available Grocery Items</h3>
        <div className="row">
          {items.map((item) => {
            const key = item.name?.toLowerCase().replace(/\s+/g, "");
            const fallback = fallbackImages[key] || milk;

            return (
              <div key={item._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow border-0 item-card">
                  <img
                    src={fallback}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-capitalize">{item.name}</h5>
                    <p className="card-text mb-1">Quantity: {item.quantity}</p>
                    <p className="card-text text-success fw-bold mb-2">
                      ₹{item.price || 0}
                    </p>
                    <div className="mt-auto d-flex justify-content-between gap-2">
                      <button
                        className="btn btn-outline-success w-100"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart 🛒
                      </button>
                      <button
                        className="btn btn-outline-primary w-100"
                        onClick={() => handleEdit(item)}
                      >
                        Edit ✏️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <p className="text-center text-muted">No items available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GroceryList;
