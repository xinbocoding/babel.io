import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class FirebaseService {
  constructor() {
    // initialize firebase app
    app.initializeApp({
      apiKey: "AIzaSyDC5gwqWjAIYYbgt6VXJnAHie6jVLxh_fI",
      authDomain: "local-firebase-dev.firebaseapp.com",
      databaseURL: "https://local-firebase-dev.firebaseio.com",
      projectId: "local-firebase-dev",
      storageBucket: "",
      messagingSenderId: "406257357332",
      appId: "1:406257357332:web:3ea887869e07a0de"
    });

    // shortcuts
    this.auth = app.auth();
    this.firestore = app.firestore();
  }
}

export default new FirebaseService();
