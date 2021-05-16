import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCn_XQTjsJd8m0o8niQIeOpI0tTPbDBeos",
  authDomain: "project-luntian.firebaseapp.com",
  projectId: "project-luntian",
  storageBucket: "project-luntian.appspot.com",
  messagingSenderId: "499850184298",
  appId: "1:499850184298:web:9c154e7f4bc7831904ac13",
  measurementId: "G-W4XV9M8FEV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  // const cacheSizeInMB = 150;
  // firebase.firestore().settings({
  //   cacheSizeBytes: cacheSizeInMB * 1000 * 1000,
  // });
  // firebase.firestore().enablePersistence({
  //   synchronizeTabs: true,
  // });
} else {
  firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export {
  auth,
  db,
  storage,
  timestamp,
  googleProvider,
  facebookProvider,
  githubProvider,
};
