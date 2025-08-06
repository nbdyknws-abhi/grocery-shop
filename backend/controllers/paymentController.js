import razorpayInstance from "../razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";

// Create Cash on Delivery order
export const createCODOrder = async (req, res) => {
  try {
    const { orderDetails } = req.body;

    const order = new Order({
      userId: req.user.id,
      orderItems: orderDetails.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      })),
      customerInfo: orderDetails.customerInfo,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "pending",
      totalAmount: orderDetails.totalAmount,
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "COD Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error creating COD order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create COD order",
      error: error.message,
    });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      orderDate: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Create Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = req.body;

    // Create signature to verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment is valid - save order to database
      const order = new Order({
        userId: req.user.id,
        orderItems: orderDetails.items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
        })),
        customerInfo: orderDetails.customerInfo,
        paymentMethod: "razorpay",
        paymentStatus: "paid",
        paymentDetails: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        orderStatus: "confirmed",
        totalAmount: orderDetails.totalAmount,
      });

      await order.save();

      console.log("Payment verified and order saved successfully");

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        orderId: order._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
