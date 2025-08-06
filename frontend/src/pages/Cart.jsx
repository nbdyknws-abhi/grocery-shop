import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

// ✅ Cart Page
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-capitalize">{item.name}</h5>
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2">Quantity:</span>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-1"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="card-text text-success fw-bold">
                      ₹{item.price || 0} x {item.quantity} = ₹
                      {(item.price || 0) * (item.quantity || 1)}
                    </p>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
            <div>
              <h5 className="mb-2">🧾 Total Items: {totalItems}</h5>
              <h5>💰 Total Price: ₹{totalPrice}</h5>
            </div>
            <div className="text-end">
              <button
                className="btn btn-outline-danger me-3"
                onClick={clearCart}
              >
                Clear Cart 🧺
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout 💳
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
