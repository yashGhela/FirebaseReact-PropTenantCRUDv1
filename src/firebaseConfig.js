import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9WakcQEPdI7x0O1fOD4wVEqYGeqPuR3U",
    authDomain: "proptenant-demo.firebaseapp.com",
    projectId: "proptenant-demo",
    storageBucket: "proptenant-demo.appspot.com",
    messagingSenderId: "742877781741",
    appId: "1:742877781741:web:d5eafb6c7deae59852f6e4",
    measurementId: "G-XMLGLR4TX0"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
  export const storage = getStorage(app);
