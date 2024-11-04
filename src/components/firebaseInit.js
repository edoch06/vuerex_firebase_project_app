
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase auth and export
const auth = getAuth(app);

// Optionally, initialize Firestore and export
const db = getFirestore(app);

export { auth, db };