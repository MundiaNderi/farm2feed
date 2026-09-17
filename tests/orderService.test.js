const { calculateOrder } = require("../services/orderService");

describe("calculateOrder", () => {
  test("calculates an order correctly", () => {
    const order = calculateOrder({
      customer_id: 123,
      items: [
        {
          product_id: 10,
          quantity: 3,
          unit_price: 250,
        },
        {
          product_id: 15,
          quantity: 2,
          unit_price: 100,
        },
      ],
    });

    expect(order.subtotal).toBe(950);
    expect(order.discount_percentage).toBe(0);
    expect(order.discount).toBe(0);
    expect(order.total).toBe(950);
  });

  test("rejects an order with no items", () => {
    expect(() =>
      calculateOrder({
        customer_id: 123,
        items: [],
      }),
    ).toThrow("Order must contain at least one item");
  });

  test("rejects quantity of zero", () => {
    expect(() =>
      calculateOrder({
        customer_id: 123,
        items: [
          {
            product_id: 10,
            quantity: 0,
            unit_price: 250,
          },
        ],
      }),
    ).toThrow("Quantity must be greater than zero");
  });

  test("rejects negative unit price", () => {
    expect(() =>
      calculateOrder({
        customer_id: 123,
        items: [
          {
            product_id: 10,
            quantity: 1,
            unit_price: -250,
          },
        ],
      }),
    ).toThrow("Unit price cannot be negative");
  });

  test("calculates a 2% discount for subtotal of 5001", () => {
    const order = calculateOrder({
      customer_id: 123,
      items: [
        {
          product_id: 10,
          quantity: 1,
          unit_price: 5001,
        },
      ],
    });

    expect(order.subtotal).toBe(5001);
    expect(order.discount_percentage).toBe(2);
    expect(order.discount).toBe(100.02);
    expect(order.total).toBe(4900.98);
  });

  test("calculates a 5% discount for subtotal of 10001", () => {
    const order = calculateOrder({
      customer_id: 123,
      items: [
        {
          product_id: 10,
          quantity: 1,
          unit_price: 10001,
        },
      ],
    });

    expect(order.discount_percentage).toBe(5);
    expect(order.discount).toBe(500.05);
    expect(order.total).toBe(9500.95);
  });

  test("calculates a 10% discount for subtotal of 20001", () => {
    const order = calculateOrder({
      customer_id: 123,
      items: [
        {
          product_id: 10,
          quantity: 1,
          unit_price: 20001,
        },
      ],
    });

    expect(order.discount_percentage).toBe(10);
    expect(order.discount).toBe(2000.1);
    expect(order.total).toBe(18000.9);
  });
});

test("does not apply a discount for subtotal of 5000", () => {
  const order = calculateOrder({
    customer_id: 123,
    items: [
      {
        product_id: 10,
        quantity: 1,
        unit_price: 5000,
      },
    ],
  });

  expect(order.discount_percentage).toBe(0);
  expect(order.discount).toBe(0);
  expect(order.total).toBe(5000);
});

test("applies a 2% discount for subtotal of 10000", () => {
  const order = calculateOrder({
    customer_id: 123,
    items: [
      {
        product_id: 10,
        quantity: 1,
        unit_price: 10000,
      },
    ],
  });

  expect(order.discount_percentage).toBe(2);
  expect(order.discount).toBe(200);
  expect(order.total).toBe(9800);
});

test("applies a 5% discount for subtotal of 20000", () => {
  const order = calculateOrder({
    customer_id: 123,
    items: [
      {
        product_id: 10,
        quantity: 1,
        unit_price: 20000,
      },
    ],
  });

  expect(order.discount_percentage).toBe(5);
  expect(order.discount).toBe(1000);
  expect(order.total).toBe(19000);
});
