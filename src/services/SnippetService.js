import firebase from 'firebase/app';

console.log(firebase.firestore.FieldValue.serverTimestamp());

class SnippetService {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }

  collection() {
    return this.firebaseService.firestore().collection('snippets');
  }

  findAllByUserId(userId) {
    return new Promise((resolve, reject) => {
      this.collection()
        .where('userId', '==', userId)
        .get()
        .then(snapshot => {
          const items = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          resolve(items);
        })
        .catch(reject);
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.collection()
        .doc(id)
        .get()
        .then(docRef => {
          if (docRef.exists) {
            resolve({
              id: docRef.id,
              ...docRef.data()
            });
          } else {
            reject(new Error('No such document'));
          }
        })
        .catch(reject);
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      const { title, note, code } = data;
      this.collection()
        .add({
          title,
          note,
          code,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => resolve(docRef.id))
        .catch(reject);
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, note, code } = data;
      this.collection()
        .doc(id)
        .set(
          {
            title,
            note,
            code,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        )
        .then(resolve)
        .catch(reject);
    });
  }
}

export default SnippetService;
