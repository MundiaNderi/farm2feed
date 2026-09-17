const { canTransition } = require("../utils/status");

describe("Order status transitions", () => {
  test("allows pending to processing", () => {
    expect(canTransition("pending", "processing")).toBe(true);
  });

  test("allows pending to cancelled", () => {
    expect(canTransition("pending", "cancelled")).toBe(true);
  });

  test("allows processing to completed", () => {
    expect(canTransition("processing", "completed")).toBe(true);
  });

  test("allows processing to cancelled", () => {
    expect(canTransition("processing", "cancelled")).toBe(true);
  });

  test("does not allow pending to completed", () => {
    expect(canTransition("pending", "completed")).toBe(false);
  });

  test("does not allow processing to pending", () => {
    expect(canTransition("processing", "pending")).toBe(false);
  });

  test("does not allow completed to cancelled", () => {
    expect(canTransition("completed", "cancelled")).toBe(false);
  });

  test("does not allow cancelled to pending", () => {
    expect(canTransition("cancelled", "pending")).toBe(false);
  });

  test("does not allow an invalid status", () => {
    expect(canTransition("pending", "something")).toBe(false);
  });
});
