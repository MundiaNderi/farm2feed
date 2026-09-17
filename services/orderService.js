const calculateDiscount = require("../utils/discount");

function calculateOrder(orderData) {
  const { customer_id, items } = orderData;

  if (!customer_id) {
    throw new Error("customer_id is required");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const calculatedItems = items.map((item) => {
    const { product_id, quantity, unit_price } = item;

    if (!product_id) {
      throw new Error("product_id is required");
    }

    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    if (unit_price < 0) {
      throw new Error("Unit price cannot be negative");
    }

    const itemSubtotal = quantity * unit_price;

    return {
      product_id,
      quantity,
      unit_price,
      subtotal: itemSubtotal,
    };
  });

  const subtotal = calculatedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0,
  );

  const discount = calculateDiscount(subtotal);

  return {
    customer_id,
    items: calculatedItems,
    subtotal,
    discount_percentage: discount.discountPercentage,
    discount: discount.discountAmount,
    total: discount.total,
  };
}

module.exports = {
  calculateOrder,
};
