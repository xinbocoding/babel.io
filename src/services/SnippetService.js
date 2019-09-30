// import firebase from 'firebase/app';

class SnippetService {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }

  snippets() {
    return this.firebaseService.firestore().collection('snippets');
  }

  findAllByUserId(userId, startAfter) {
    return new Promise((resolve, reject) => {
      let query = this.snippets()
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc');

      if (startAfter) {
        query = query.startAfter(startAfter);
      }

      query
        .limit(10)
        .get()
        .then(snapshot => {
          const snippets = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));

          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          resolve({ snippets, lastVisible });
        })
        .catch(reject);
    });
  }

  findById(snippetId) {
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
            reject(new Error('No such document'));
          }
        })
        .catch(reject);
    });
  }

  create(snippet, marks) {
    return new Promise((resolve, reject) => {
      const { title, code, note, lang } = snippet;
      const db = this.firebaseService.firestore();
      const batch = db.batch();
      const snippetRef = this.snippets().doc();
      batch.set(snippetRef, {
        userId: this.firebaseService.currentUser().uid,
        title,
        code,
        note,
        lang,
        // createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
      const { title, note, code, lang } = snippet;
      const db = this.firebaseService.firestore();
      const batch = db.batch();
      const snippetRef = this.snippets().doc(snippetId);

      batch.update(snippetRef, {
        title,
        note,
        code,
        lang,
        // updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      removedMarks.forEach(removeId => {
        batch.delete(snippetRef.collection('marks').doc(removeId));
      });

      marks.forEach(({ id, from, to, type }) => {
        const collection = snippetRef.collection('marks');
        const markRef = id ? collection.doc(id) : collection.doc();
        batch.set(markRef, { from, to, type });
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
