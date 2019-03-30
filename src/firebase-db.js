import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAEF4haL9W88EWATZOfPVSpTnVI8sRs-Jw",
  authDomain: "traction-tv.firebaseapp.com",
  databaseURL: "https://traction-tv.firebaseio.com",
  projectId: "traction-tv",
  storageBucket: "traction-tv.appspot.com",
  messagingSenderId: "983156700745"
};
firebase.initializeApp(config);

export default firebase;
