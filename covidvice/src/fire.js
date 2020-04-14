import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCXJ9_QPgQbMnZFVpmCRRDdMNW87Df17PE",
    authDomain: "covidvice.firebaseapp.com",
    databaseURL: "https://covidvice.firebaseio.com",
    projectId: "covidvice",
    storageBucket: "covidvice.appspot.com",
    messagingSenderId: "308047348545",
    appId: "1:308047348545:web:4cc0bec003168b9c0b97c0"
  };

var fire = firebase.initializeApp(firebaseConfig);
export default fire;