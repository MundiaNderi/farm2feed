function calculateDiscount(subtotal) {
  let discountPercentage;

  if (subtotal <= 5000) {
    discountPercentage = 0;
  } else if (subtotal <= 10000) {
    discountPercentage = 2;
  } else if (subtotal <= 20000) {
    discountPercentage = 5;
  } else {
    discountPercentage = 10;
  }

  const discountAmount = Number(
    (subtotal * (discountPercentage / 100)).toFixed(2),
  );

  const total = Number((subtotal - discountAmount).toFixed(2));

  return {
    discountPercentage,
    discountAmount,
    total,
  };
}

module.exports = calculateDiscount;
