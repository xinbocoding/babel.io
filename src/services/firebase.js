import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseService = app.initializeApp({
  apiKey: "AIzaSyDC5gwqWjAIYYbgt6VXJnAHie6jVLxh_fI",
  authDomain: "local-firebase-dev.firebaseapp.com",
  databaseURL: "https://local-firebase-dev.firebaseio.com",
  projectId: "local-firebase-dev",
  storageBucket: "",
  messagingSenderId: "406257357332",
  appId: "1:406257357332:web:3ea887869e07a0de"
});

export default firebaseService;
