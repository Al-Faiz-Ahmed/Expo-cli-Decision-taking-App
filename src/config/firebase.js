import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential, } from "firebase/auth";
import { getFirestore,orderBy, doc, setDoc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCfPShxBjTIUjxJUmdS2uJ-NAc4Ah_4G0k",
    authDomain: "reactjs-foodapp.firebaseapp.com",
    projectId: "reactjs-foodapp",
    storageBucket: "reactjs-foodapp.appspot.com",
    messagingSenderId: "922243365326",
    appId: "1:922243365326:web:35a2421d9a0fc3ebcf139f",
    measurementId: "G-WE4FPPV9KX"
};
initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()

export {
    db, collection, doc, orderBy,getDoc, setDoc, auth, onAuthStateChanged, FacebookAuthProvider, query, where, onSnapshot, signInWithCredential,
}
