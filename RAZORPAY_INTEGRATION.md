# Razorpay Payment Gateway Integration

This grocery shopping application now includes Razorpay payment gateway integration for secure online payments.

## Features Added

### Backend Features

- **Payment Routes**: Added payment endpoints for creating orders and verifying payments
- **Order Management**: Complete order tracking with different payment methods
- **Payment Verification**: Secure payment signature verification using Razorpay webhooks
- **Database Models**: Order model to store order details, payment information, and order status

### Frontend Features

- **Razorpay Integration**: Direct integration with Razorpay checkout
- **Multiple Payment Methods**: Cash on Delivery (COD) and Online Payment
- **Order Management**: View order history and track order status
- **Enhanced Cart**: Quantity management with increment/decrement controls
- **Order Form**: Comprehensive checkout form with customer details

## Setup Instructions

### 1. Razorpay Account Setup

1. Create a Razorpay account at [https://razorpay.com](https://razorpay.com)
2. Get your `Key ID` and `Key Secret` from the dashboard
3. Add these to your `.env` file in the backend

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/grocery-shop

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Server Port
PORT=5000
```

### 3. Install Dependencies

Backend dependencies are already installed, including:

- `razorpay`: For payment processing
- `crypto`: For payment signature verification

### 4. API Endpoints

#### Payment Endpoints

- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify-payment` - Verify payment signature
- `POST /api/payment/cod-order` - Create Cash on Delivery order
- `GET /api/payment/orders` - Get user orders

## How It Works

### Payment Flow

1. **Cart Management**: Users add items to cart with quantity controls
2. **Checkout**: Users fill delivery information and select payment method
3. **Payment Processing**:
   - **COD**: Order saved directly to database
   - **Online**: Razorpay checkout opens for payment
4. **Verification**: Payment signature verified on backend
5. **Order Confirmation**: Order saved with payment details

### Security Features

- Payment signature verification using HMAC SHA256
- JWT authentication for all order endpoints
- Secure order storage with payment tracking

## Order Management

### Order Status Tracking

- `pending`: Order placed, payment pending
- `confirmed`: Payment verified, order confirmed
- `processing`: Order being prepared
- `shipped`: Order dispatched
- `delivered`: Order completed
- `cancelled`: Order cancelled

### Payment Status

- `pending`: Payment not completed
- `paid`: Payment successful
- `failed`: Payment failed

## Navigation

- **Home**: Browse grocery items
- **Cart**: Manage cart items and quantities
- **Checkout**: Place orders with payment
- **My Orders**: View order history and status

## Files Modified/Added

### Backend Files

- `routes/paymentRoutes.js` - Payment route handlers
- `controllers/paymentController.js` - Payment logic and order management
- `models/Order.js` - Order database schema
- `server.js` - Added payment routes
- `razorpay.js` - Razorpay configuration (existing)

### Frontend Files

- `pages/OrderForm.jsx` - Enhanced checkout with Razorpay
- `pages/Orders.jsx` - Order history page
- `pages/Cart.jsx` - Enhanced cart with quantity controls
- `context/CartContext.jsx` - Updated cart management
- `components/Navbar.jsx` - Added Orders navigation
- `App.jsx` - Added Orders route

## Testing

### Test COD Orders

1. Add items to cart
2. Go to checkout
3. Fill delivery information
4. Select "Cash on Delivery"
5. Place order

### Test Online Payments

1. Set up Razorpay test credentials
2. Add items to cart
3. Go to checkout
4. Select "Pay Online (Razorpay)"
5. Complete payment using test card details

### Test Cards (Razorpay Test Mode)

- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002

## Notes

- Razorpay script is loaded dynamically when needed
- All payments are processed securely through Razorpay
- Order data is stored for tracking and management
- UI includes loading states and error handling
