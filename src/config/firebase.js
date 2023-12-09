import { initializeApp } from "firebase/app";


import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pelikulaph-97d16.firebaseapp.com",
  projectId: "pelikulaph-97d16",
  storageBucket: "pelikulaph-97d16.appspot.com",
  messagingSenderId: "410333173902",
  appId: "1:410333173902:web:b0f114ff638917698a51df",
  measurementId: "G-HM2JTDWDDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider()

// CUSTOM LOGIN HOOKS
export const signInWithGoogle = async () => {
    try{
        const userCredentials = await signInWithPopup(auth, googleProvider)
        const user = userCredentials.user;

        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('userData', JSON.stringify(user))

        return true
    }catch(err){
        throw err;
    }
}

export const signUpWithCredentials = async (name, email, password) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        await updateProfile(user, {
            displayName: name
        });

        return true
    } catch (err) {
        throw err;
    }
}
export const signInWithCredentials = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('userData', JSON.stringify(user))
        return true
    } catch (err) {
        throw err;
    }
}

export const logOut = async () => {
    await signOut(auth)
}
