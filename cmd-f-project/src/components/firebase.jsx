// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as React from 'react';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBySAe7UW_LzIDUDQL-oawFnefsuH0esHI",
  authDomain: "cmdf2025-jjmb.firebaseapp.com",
  projectId: "cmdf2025-jjmb",
  storageBucket: "cmdf2025-jjmb.firebasestorage.app",
  messagingSenderId: "1076186895752",
  appId: "1:1076186895752:web:073ef30f6a9f8b7d39963d",
  measurementId: "G-S8080Y6JXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;