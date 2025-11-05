// smoke.test.js
describe("Basic Smoke Tests", () => {
  test("This test should PASS", () => {
    const sum = 2 + 3;
    expect(sum).toBe(5); // ✅ Passes
  });

  test("This test should FAIL", () => {
    const truth = false;
    expect(truth).toBe(true); // ❌ Fails intentionally
  });
});
