const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const cors = require('cors')({
  origin: true
});

exports.userInfo = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin
      .auth()
      .getUser(req.body.data.id)
      .then(userRecord => {
        res.status(200).send({
          data: {
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL
          }
        });
        return userRecord;
      })
      .catch(error => {
        res.status(404).send({ error: 'no such user' });
      });
  });
});
