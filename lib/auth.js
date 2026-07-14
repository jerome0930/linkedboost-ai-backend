import { adminAuth } from "./firebase-admin.js";

export async function requireUser(request) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    const error = new Error("Sign in first.");
    error.status = 401;
    error.code = "AUTH_REQUIRED";
    throw error;
  }

  try {
    return await adminAuth.verifyIdToken(match[1], true);
  } catch {
    const error = new Error("Your session is invalid or expired. Sign in again.");
    error.status = 401;
    error.code = "INVALID_SESSION";
    throw error;
  }
}
