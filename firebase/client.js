import { initializeApp } from "@firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBdReMp23KlS6Poylam7PVOdLkd6EejV4",
    authDomain: "auth-edgxrshop.firebaseapp.com",
    projectId: "auth-edgxrshop",
    storageBucket: "auth-edgxrshop.appspot.com",
    messagingSenderId: "668518288622",
    appId: "1:668518288622:web:1b2eef2e2cde76961277ff",
    measurementId: "G-D3E9VBWY8H"
  };
  
  const app = initializeApp(firebaseConfig)

  const mapUserFromFirebaseAuthToUser = (user) => {
    const {displayName, email, photoURL } = user
  
    return {
      avatar: photoURL,
      username: displayName,
      email
    }
  }

  export const onAuthStateChangedControl = (onChange) => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const normalizedUser = mapUserFromFirebaseAuthToUser(user);
        return onChange(normalizedUser);
      } else {
        return onChange(null);
      }
    });
  };

  export const loginGoogle = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
    
  }

  export const logoutGoogle = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
  }