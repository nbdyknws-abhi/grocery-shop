import express from "express";
import {
  createOrder,
  verifyPayment,
  createCODOrder,
  getUserOrders,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify-payment", protect, verifyPayment);
router.post("/cod-order", protect, createCODOrder);
router.get("/orders", protect, getUserOrders);

export default router;
