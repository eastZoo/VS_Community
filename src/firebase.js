import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD7R-BK2XSRvRNwwuNI1UxRh0EZ8dmmTz4",
    authDomain: "react-twitter-e086b.firebaseapp.com",
    projectId: "react-twitter-e086b",
    storageBucket: "react-twitter-e086b.appspot.com",
    messagingSenderId: "755619964434",
    appId: "1:755619964434:web:db9a22d0e58350d4d99acb"
  };

  const app = initializeApp(firebaseConfig);
  export const authService = getAuth();

  export default app;