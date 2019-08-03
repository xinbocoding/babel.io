import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class FirebaseService {
  constructor(config) {
    this.app = firebase.initializeApp(config);
  }

  firestore() {
    return this.app.firestore();
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
