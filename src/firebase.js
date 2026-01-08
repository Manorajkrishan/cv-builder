// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCDJervBooRDD0rWyKwI-vR0LhVVdZVgeA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cvai-c32a4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cvai-c32a4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cvai-c32a4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "91906216022",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:91906216022:web:2d8cf9cebe862054b5abf7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MWSTEBDQC5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };