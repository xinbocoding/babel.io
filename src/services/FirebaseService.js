import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

class FirebaseService {
  constructor(config) {
    this.app = firebase.initializeApp(config);
    this.functions = firebase.functions;
  }

  firestore() {
    return this.app.firestore();
  }

  callable(name) {
    return this.app.functions().httpsCallable(name);
  }

  auth() {
    return this.app.auth();
  }

  currentUser() {
    return this.app.auth().currentUser;
  }

  currentUserId() {
    return this.currentUser().uid;
  }
}

export default FirebaseService;
