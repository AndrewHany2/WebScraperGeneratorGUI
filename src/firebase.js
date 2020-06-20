import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBkp7rmdXeEZ4Winxa4eiYLHBfclxO9C_E",
  authDomain: "webscrapergenerator.firebaseapp.com",
  databaseURL: "https://webscrapergenerator.firebaseio.com",
  projectId: "webscrapergenerator",
  storageBucket: "webscrapergenerator.appspot.com",
  messagingSenderId: "807492039852",
  appId: "1:807492039852:web:ee4e5eccc7e43306c49b09",
  measurementId: "G-KFF29YY496",
};

// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// export default fire;

// // //<!-- The core Firebase JS SDK is always required and must be listed first -->
// // <script src="https://www.gstatic.com/firebasejs/7.15.2/firebase-app.js"></script>

// // //<!-- TODO: Add SDKs for Firebase products that you want to use
// //      https://firebase.google.com/docs/web/setup#available-libraries -->
// // <script src="https://www.gstatic.com/firebasejs/7.15.2/firebase-analytics.js"></scrip
// // </script>
