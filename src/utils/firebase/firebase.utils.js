// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
  getFirestore,
  // doc is used to get instance of the document 
  doc,
  // getDoc is used to get the data of the document
  getDoc,
  setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_A4EkN-ombRMrUp0PlFreEoBwk0xeEjs",
  authDomain: "crown-clothing-db-499aa.firebaseapp.com",
  projectId: "crown-clothing-db-499aa",
  storageBucket: "crown-clothing-db-499aa.appspot.com",
  messagingSenderId: "1079798179283",
  appId: "1:1079798179283:web:66ba81edeb44a019c97b26"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (err) {
      console.log("🚀 ~ file: firebase.utils.js ~ line 50 ~ createUserDocumentFromAuth ~ err", err)

    }
  }

  return userDocRef;
}