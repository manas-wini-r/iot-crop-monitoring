import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSk5iLQ61qSaFyCuNPKYGGNMmObz8QsZU",
  authDomain: "mini-project-f8e12.firebaseapp.com",
  databaseURL: "https://mini-project-f8e12-default-rtdb.firebaseio.com",
  projectId: "mini-project-f8e12",
  storageBucket: "mini-project-f8e12.firebasestorage.app",
  messagingSenderId: "1003169160414",
  appId: "1:1003169160414:web:b7466a7ee212bc1cdeb64f",
  measurementId: "G-RLCEJ6DZCE"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);