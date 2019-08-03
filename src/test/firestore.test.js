import * as firebase from '@firebase/testing';

import fs from 'fs';

const { assertFails, assertSucceeds } = firebase;

const createApps = async (users = [null]) => {
  const projectId = `rule-spec-${Date.now()}`;

  const apps = await Promise.all(
    users.map(async auth => {
      const app = firebase.initializeTestApp({
        projectId,
        auth
      });
      return app.firestore();
    })
  );

  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules', 'utf8')
  });

  return apps;
};

const deleteApps = async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
};

describe('Unauthorized user', () => {
  const USER_ID = `U${new Date().getTime()}`;

  let authed;
  let guest;
  beforeAll(async () => {
    [guest, authed] = await createApps([null, { uid: USER_ID }]);
  });

  afterAll(async () => {
    await deleteApps();
  });

  test('can get a snippet', async () => {
    const ref = guest.collection('snippets').doc('AEH86VPMgmVIUZHk7vF6');
    const successedRead = await assertSucceeds(ref.get());
    expect(successedRead);
  });

  const dataCreate = {
    userId: null,
    title: 'Unamed Snippet 1',
    mode: 'javascript',
    code: 'unnamed1();',
    note: 'empty note',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  test('can not create a snippet', async () => {
    const ref = guest.collection('snippets').doc();
    const failedWrite = await assertFails(ref.set(dataCreate));
    expect(failedWrite);
  });

  test('can not update a snippet', async () => {
    const existsPath = `snippets/${new Date().getTime()}`;
    await authed.doc(existsPath).set({
      userId: USER_ID,
      title: 'Example Snippet 1',
      mode: 'javascript',
      code: 'example();',
      note: 'example note',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    const dataUpdate = {
      title: 'Unamed Snippet 1',
      mode: 'javascript',
      code: 'unnamed1();',
      note: 'empty note',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    expect(await assertFails(guest.doc(existsPath).update(dataUpdate)));
  });
});
