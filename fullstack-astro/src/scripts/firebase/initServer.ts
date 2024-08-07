import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps, deleteApp } from "firebase-admin/app";

const serviceAccount = {
  type: "service_account",
  universe_domain: "googleapis.com",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

/**
 * Firebase admin specifically checks for these
 * to use the emulators in development mode
 */

if (import.meta.env.DEV) {
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = "127.0.0.1:3005";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9098";
}

// let app: ReturnType<typeof initializeApp>;

const activeApps = getApps();
const getServerApp = () => {
  // if (app || admin.apps.length) {
  //   return app;
  // }

  console.info("Loading service account from env.");
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
};

export const serverApp = activeApps.length === 0 ? getServerApp() : activeApps[0];
