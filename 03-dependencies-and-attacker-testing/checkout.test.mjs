import { test } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const PRODUCT_ID = process.env.PRODUCT_ID ?? "42";

async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  assert.equal(res.status, 200, `Login failed for ${email}`);
  const { token } = await res.json();
  return token;
}

function headers(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

test("Checkout ignores a tampered price", async () => {
  const token = await login(process.env.USER_A_EMAIL, process.env.USER_A_PASSWORD);

  // Get the real price from the server
  const productRes = await fetch(`${BASE_URL}/api/products/${PRODUCT_ID}`, { headers: headers(token) });
  const product = await productRes.json();

  // Send an order with a price of one cent
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ productId: Number(PRODUCT_ID), quantity: 1, price: 0.01 }),
  });

  // Rejecting the request outright is also a pass
  if ([400, 422].includes(res.status)) return;

  assert.ok(res.ok, `Unexpected status ${res.status}`);
  const order = await res.json();
  assert.equal(
    order.total,
    product.price,
    `Order total was ${order.total}, expected ${product.price}. The server trusted the price from the request.`
  );
});

test("Checkout rejects a negative quantity", async () => {
  const token = await login(process.env.USER_A_EMAIL, process.env.USER_A_PASSWORD);

  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ productId: Number(PRODUCT_ID), quantity: -1 }),
  });
  assert.ok(
    [400, 422].includes(res.status),
    `Expected 400 or 422, got ${res.status}. A negative quantity could turn a charge into a refund.`
  );
});
