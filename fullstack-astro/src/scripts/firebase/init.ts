/**
 * Import the Firebase client modules
 */
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

/**
 * The following represent the firebase client configuration for the application.
 * These are safe to be exposed on the client.
 * ⚠️ TODO: change these to match your project configuration.
 */
const firebaseConfig = {
  projectId: "beaudible-8ebf2",
  messagingSenderId: "843797881366",
  authDomain: "beaudible-8ebf2.firebaseapp.com",
  storageBucket: "beaudible-8ebf2.appspot.com",
  apiKey: "AIzaSyCI0Adh2Za5swONG9waS_FVVM78MIIs2Nw",
  appId: "1:843797881366:web:5531d61cb5674cca668b37",
};

// Initialize Firebase apps
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * For local testing add authentication emulator
 */
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9098");
}
