import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  TwitterAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDD6gjNf9HMgTaie2Lv2xwouaq8AZDDjew",
  authDomain: "biaslens-3c517.firebaseapp.com",
  projectId: "biaslens-3c517",
  storageBucket: "biaslens-3c517.firebasestorage.app",
  messagingSenderId: "331810910970",
  appId: "1:331810910970:web:216943fbfec1e58ff74f43",
  measurementId: "G-25781WM3FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Authentication Providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

// Lazy load Firestore to avoid massive un-tree-shakable bundle sizes on the landing page
let dbInstance = null;
const getDb = async () => {
  if (dbInstance) return dbInstance;
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
  dbInstance = getFirestore(app);
  return dbInstance;
};

const getFirestoreDeps = async () => {
  return await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
};

export { 
  app, 
  auth, 
  getDb,
  getFirestoreDeps,
  googleProvider,
  twitterProvider,
  githubProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};
