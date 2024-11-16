import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtGDP6Tvzpgp9wJ_g3haLTekZWj_naLoM",
  authDomain: "creditcardgenius-56958.firebaseapp.com",
  projectId: "creditcardgenius-56958",
  storageBucket: "creditcardgenius-56958.firebasestorage.app",
  messagingSenderId: "916658598408",
  appId: "1:916658598408:web:186a3fa56b747ba91fd7bd",
  measurementId: "G-QT6QNYLD3G"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Connect to emulator in development
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}