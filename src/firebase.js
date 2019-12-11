import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBsmPjpyl07kAt_SNJYyeJ1ebZdvbLA6z4",
  authDomain: "presentation-df945.firebaseapp.com",
  databaseURL: "https://presentation-df945.firebaseio.com",
  projectId: "presentation-df945",
  storageBucket: "presentation-df945.appspot.com",
  messagingSenderId: "762960956327",
  appId: "1:762960956327:web:8d40391b3d35ab6f754482",
  measurementId: "G-7WHVL6K72B"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
