import { initializeApp } from "firebase/app";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: "712427010646",
  appId: "1:712427010646:web:af57f2cef8e693febd59f7",
  measurementId: "G-ZDNQFS5BTD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
