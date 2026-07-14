import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function normalizePrivateKey(rawValue) {
  let value = rawValue.trim();

  // Accept the entire service-account JSON if it was pasted.
  try {
    const parsed = JSON.parse(value);

    if (typeof parsed === "string") {
      value = parsed;
    } else if (parsed?.private_key) {
      value = parsed.private_key;
    }
  } catch {
    // Continue cleaning a normal private-key value.
  }

  value = value
    .replace(/^["']?private_key["']?\s*:\s*/i, "")
    .replace(/^["']/, "")
    .replace(/["'],?$/, "")
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "")
    .trim();

  const pemKey = value.match(
    /-----BEGIN PRIVATE KEY-----[\s\S]*?-----END PRIVATE KEY-----/
  );

  if (!pemKey) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY does not contain a valid private key."
    );
  }

  return pemKey[0];
}

const app =
  getApps()[0] ||
  initializeApp({
    credential: cert({
      projectId: required("FIREBASE_PROJECT_ID"),
      clientEmail: required("FIREBASE_CLIENT_EMAIL"),
      privateKey: normalizePrivateKey(
        required("FIREBASE_PRIVATE_KEY")
      ),
    }),
  });

export const adminAuth = getAuth(app);
export const db = getFirestore(app);
