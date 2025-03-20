import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr8G5h8_LOccKah9uhO5GDyjrdvQF96Gc",
  authDomain: "estudiosilk.firebaseapp.com",
  projectId: "estudiosilk",
  storageBucket: "estudiosilk.firebasestorage.app",
  messagingSenderId: "999995631793",
  appId: "1:999995631793:web:ff1a41dec121bc7debda90",
  measurementId: "G-B975DRDNRJ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
