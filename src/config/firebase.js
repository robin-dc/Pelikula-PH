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

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pelikulaph-72065.firebaseapp.com",
  projectId: "pelikulaph-72065",
  storageBucket: "pelikulaph-72065.appspot.com",
  messagingSenderId: "34317435127",
  appId: "1:34317435127:web:5b419c38cf736e457413f2",
  measurementId: "G-ZGNRGJZ17Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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

// CUSTOM FIRESTORE HOOKS
const fireStoreRef = collection(db, 'movies');

export const fetchData = async () => {
    const data = await getDocs(fireStoreRef)
    const transformedData = data.docs.map(doc => ({...doc.data(), id: doc.id}))

    return transformedData
}

export const addToWatchLater = async (movie) => {
    await addDoc(fireStoreRef, {
        ...movie,
        author: {
            name: auth?.currentUser?.displayName,
            id: auth?.currentUser?.uid
        }})
}

export const removeToWatchLater = async (movieId) => {
    const movie = doc(db, "movies", movieId)
    await deleteDoc(movie)
}
export const logOut = async () => {
    await signOut(auth)
}
