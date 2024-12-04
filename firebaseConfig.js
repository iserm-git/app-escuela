import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANd0kgDy6xXwazNxnkhos_GKCN9spVW08",
  authDomain: "appescuela-ea8c1.firebaseapp.com",
  projectId: "appescuela-ea8c1",
  storageBucket: "appescuela-ea8c1.firebasestorage.app",
  messagingSenderId: "926127922641",
  appId: "1:926127922641:web:a8e5c81a93fef14f6554f0",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
