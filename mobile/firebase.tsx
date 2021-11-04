// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf1qSNoKXdbL0_vxM8w9Bjg4Wwt3zfzJA",
  authDomain: "job-search-97158.firebaseapp.com",
  projectId: "job-search-97158",
  storageBucket: "job-search-97158.appspot.com",
  messagingSenderId: "571257331659",
  appId: "1:571257331659:web:33944609f9e5744ec5204e",
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
