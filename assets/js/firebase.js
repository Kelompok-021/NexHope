const firebaseConfig = {
    apiKey: "AIzaSyDODtQ7R15V5Zcp_ZxAiTh3Zp4rdbe2k7g",
    authDomain: "nexhope-7c58f.firebaseapp.com",
    projectId: "nexhope-7c58f",
    storageBucket: "nexhope-7c58f.appspot.com",
    messagingSenderId: "660899140855",
    appId: "1:660899140855:web:216abd96901460dddc2ff2",
    measurementId: "G-TFFGNDD11X"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();