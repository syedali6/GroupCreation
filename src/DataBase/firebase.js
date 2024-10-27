// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2lIkZlF_dFgjNMLmppRe_UO_Bsu1EZ5c",
  authDomain: "groupcreation-95ea3.firebaseapp.com",
  projectId: "groupcreation-95ea3",
  storageBucket: "groupcreation-95ea3.appspot.com",
  messagingSenderId: "821721600459",
  appId: "1:821721600459:web:69fbb575a3c926e326264e",
  measurementId: "G-7M1LKGEBFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// if (window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://localhost:5173");
//   connectFirestoreEmulator(db, "localhost", 8080);
//   connectStorageEmulator(storage, "localhost", 9199);
// }

export { auth, db, storage };
