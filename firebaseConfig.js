import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "CAMBIAR",
  authDomain: "CAMBIAR",
  projectId: "CAMBIAR",
  storageBucket: "CAMBIAR",
  messagingSenderId: "CAMBIAR",
  appId: "1:CAMBIAR",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
