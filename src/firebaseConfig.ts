import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAaw4aTWlEncshnWJ2rCWif_wif4SiS3Ic",

  authDomain: "narratica-e30a9.firebaseapp.com",

  projectId: "narratica-e30a9",

  storageBucket: "narratica-e30a9.firebasestorage.app",

  messagingSenderId: "390252562121",

  appId: "1:390252562121:web:6837dce2d9747bf3a9af18",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export auth & functions properly
export { auth, provider, signInWithPopup, signOut };
