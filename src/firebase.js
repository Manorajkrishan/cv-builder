// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyCDJervBooRDD0rWyKwI-vR0LhVVdZVgeA",
  authDomain: "cvai-c32a4.firebaseapp.com",
  projectId: "cvai-c32a4",
  storageBucket: "cvai-c32a4.firebasestorage.app",
  messagingSenderId: "91906216022",
  appId: "1:91906216022:web:2d8cf9cebe862054b5abf7",
  measurementId: "G-MWSTEBDQC5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };