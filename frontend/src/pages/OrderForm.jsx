import { useState } from "react";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "cod",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!\n\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Place Your Order</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            required
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Payment Method</label>
          <select
            className="form-select"
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
