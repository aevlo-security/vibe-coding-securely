import { test } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

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

test("User B cannot read User A's invoice", async () => {
  const tokenA = await login(process.env.USER_A_EMAIL, process.env.USER_A_PASSWORD);
  const tokenB = await login(process.env.USER_B_EMAIL, process.env.USER_B_PASSWORD);

  // User A creates an invoice
  const created = await fetch(`${BASE_URL}/api/invoices`, {
    method: "POST",
    headers: headers(tokenA),
    body: JSON.stringify({ amount: 100 }),
  });
  assert.equal(created.status, 201);
  const { id } = await created.json();

  // User B requests it
  const res = await fetch(`${BASE_URL}/api/invoices/${id}`, { headers: headers(tokenB) });
  assert.ok(
    [403, 404].includes(res.status),
    `Expected 403 or 404, got ${res.status}. Possible BOLA.`
  );
});

test("A regular user cannot reach admin endpoints", async () => {
  const tokenB = await login(process.env.USER_B_EMAIL, process.env.USER_B_PASSWORD);

  const res = await fetch(`${BASE_URL}/api/admin/users`, { headers: headers(tokenB) });
  assert.ok(
    [403, 404].includes(res.status),
    `Expected 403 or 404, got ${res.status}. Possible broken function-level authorization.`
  );
});
