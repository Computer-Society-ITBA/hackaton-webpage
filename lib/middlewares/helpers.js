
//'use client';
import { adminAuth } from "../../functions/api/firebaseConfig.js";
import { error } from "../../functions/api/model/error";

// --------------------
// Authentication helper
// --------------------

/**
 * verifyBearer
 *  - Parses a Bearer token from the `Authorization` header string
 *  - Verifies it with Firebase Admin
 *  - Returns the decoded token on success
 *  - Throws an object { status, body } on failure
 */
export async function verifyBearer(header) {
  if (!header) {
    throw { status: 401, body: error(1, "Missing Authorization header") };
  }
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    throw { status: 401, body: error(2, "Bad access token") };
  }
  try {
    const decoded = await adminAuth.verifyIdToken(parts[1]);
    return decoded; // contains { uid, role, ... }
  } catch (e) {
    throw { status: 401, body: error(e.code || 3, e.message || "Invalid token") };
  }
}

// --------------------
// Role-authorization helper
// --------------------

/**
 * assertRole
 *  - Checks if the decodedToken has one of the allowed roles
 *  - Throws { status, body } if user.role is not in allowed array
 */
export function assertRole(decodedToken, allowedRoles) {
  if (!decodedToken || !allowedRoles.includes(decodedToken.role)) {
    throw { status: 403, body: error(4, "Missing or insufficient permission") };
  }
}

// --------------------
// Role constants
// --------------------
export const ROLE_ADMIN = "admin";
export const ROLE_JURY = "jury";
export const ROLE_MENTOR = "mentor";
export const ROLE_USER = "user";
