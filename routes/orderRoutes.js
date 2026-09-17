const express = require("express");

const router = express.Router();

// Create an order
router.post("/orders", (req, res) => {
  res.status(501).json({
    message: "Create order not implemented yet",
  });
});

// Get a single order
router.get("/orders/:id", (req, res) => {
  res.status(501).json({
    message: "Get order not implemented yet",
  });
});

// List orders
router.get("/orders", (req, res) => {
  res.status(501).json({
    message: "List orders not implemented yet",
  });
});

// Update order status
router.patch("/orders/:id/status", (req, res) => {
  res.status(501).json({
    message: "Update order status not implemented yet",
  });
});

module.exports = router;
