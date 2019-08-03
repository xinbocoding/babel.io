import firebase from 'firebase/app';

class SnippetService {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }

  snippets() {
    return this.firebaseService.firestore().collection('snippets');
  }

  findAllByUserId(userId) {
    return new Promise((resolve, reject) => {
      this.snippets()
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

  findById(snippetId, withMarks = false) {
    return new Promise((resolve, reject) => {
      this.snippets()
        .doc(snippetId)
        .get()
        .then(docRef => {
          const snippet = {
            id: docRef.id,
            ...docRef.data()
          };
          if (docRef.exists) {
            if (withMarks) {
              this.snippets()
                .doc(docRef.id)
                .collection('marks')
                .get()
                .then(markSnap => {
                  const marks = markSnap.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                  }));
                  resolve({ snippet, marks });
                });
            } else {
              resolve({ snippet, marks: [] });
            }
          } else {
            reject(new Error('No such document'));
          }
        })
        .catch(reject);
    });
  }

  create(snippet, marks) {
    return new Promise((resolve, reject) => {
      const { title, code, note, mode } = snippet;
      const db = this.firebaseService.firestore();
      const batch = db.batch();
      const snippetRef = this.snippets().doc();
      batch.set(snippetRef, {
        userId: this.firebaseService.currentUser().uid,
        title,
        code,
        note,
        mode,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      marks.forEach(m => batch.set(snippetRef.collection('marks').doc(), m));
      batch
        .commit()
        .then(() => resolve(snippetRef.id))
        .catch(reject);
    });
  }

  update(snippetId, snippet, marks, removedMarks) {
    return new Promise((resolve, reject) => {
      console.log({ snippet, marks, removedMarks });

      const { title, note, code, mode } = snippet;
      const db = this.firebaseService.firestore();
      const batch = db.batch();
      const snippetRef = this.snippets().doc(snippetId);
      batch.update(snippetRef, {
        title,
        note,
        code,
        mode,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      removedMarks.forEach(removeId => {
        batch.delete(snippetRef.collection('marks').doc(removeId));
      });

      marks
        .filter(m => !m.id)
        .forEach(m => {
          batch.set(snippetRef.collection('marks').doc(), m);
        });

      batch
        .commit()
        .then(() => resolve(snippetRef.id))
        .catch(reject);
    });
  }

  delete(snippetId) {
    return new Promise((resolve, reject) => {
      this.snippets()
        .doc(snippetId)
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }
}

export default SnippetService;
