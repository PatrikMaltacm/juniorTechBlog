import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVcRV9gCLt7pL814GNLMKtp_KEAdJfkYY",
  authDomain: "blog-47657.firebaseapp.com",
  projectId: "blog-47657",
  storageBucket: "blog-47657.firebasestorage.app",
  messagingSenderId: "198889981638",
  appId: "1:198889981638:web:bdb34095fb356f5b29f9c7",
  measurementId: "G-GRDJMTJLB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics;
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  }
});

export { app, analytics, db };