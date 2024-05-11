// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlP7S4F5iTW76E905AaVioiCCun5ptNFM",
  authDomain: "my-react-projects-d3d6a.firebaseapp.com",
  projectId: "my-react-projects-d3d6a",
  storageBucket: "my-react-projects-d3d6a.appspot.com",
  messagingSenderId: "283092367992",
  appId: "1:283092367992:web:c8f4f22377d0ad91a54b8d",
  measurementId: "G-YQ74KX9VL7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);