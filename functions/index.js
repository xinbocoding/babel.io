const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addUserIdOnSnippet = functions.firestore
  .document('snippets/{id}')
  .onCreate((snap, context) => {
    snap.ref.set({
      userId: context.auth.uid
    }, { merge: true });
  });
