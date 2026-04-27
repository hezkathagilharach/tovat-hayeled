import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "hezkat-hagil-harach.firebaseapp.com",
  projectId: "hezkat-hagil-harach",
  storageBucket: "hezkat-hagil-harach.firebasestorage.app",
  messagingSenderId: "251986465767",
  appId: "1:251986465767:web:798e9d1990e47e971be342",
  measurementId: "G-55M9TQ7WWN"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;