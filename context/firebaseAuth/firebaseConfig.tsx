import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAsTs8vhWGJBuHY9Akbo_jAjO4KmP9ULiM",
    authDomain: "ridesharing-584f0.firebaseapp.com",
    databaseURL: "https://ridesharing-584f0-default-rtdb.firebaseio.com",
    projectId: "ridesharing-584f0",
    storageBucket: "ridesharing-584f0.appspot.com",
    messagingSenderId: "818602134431",
    appId: "1:818602134431:web:5be09816247d0c49530baa",
    measurementId: "G-WENBQKGQ5C"
  };  

  initializeApp(firebaseConfig)
export const auth = getAuth() ;