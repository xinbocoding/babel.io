import * as firebase from '@firebase/testing';
import fs from 'fs';

expect.extend({
  async toDeny(x) {
    let pass = false;
    let message = '';
    try {
      await firebase.assertFails(x);
      pass = true;
    } catch (err) {
      message = err.message;
    }
    return {
      pass,
      message: () =>
        `Expected Firebase operation to be denied, but it was allowed.\n\t${message}`
    };
  },

  async toAllow(x) {
    let pass = false;
    let message = '';
    try {
      await firebase.assertSucceeds(x);
      pass = true;
    } catch (err) {
      message = err.message;
    }
    return {
      pass,
      message: () =>
        `Expected Firebase operation to be allowed, but it was denied.\n\t${message}`
    };
  }
});

export const createApps = async (auth = null) => {
  const projectId = `rule-spec-${Date.now()}`;
  const users = Array.isArray(auth) ? auth : [auth];

  const apps = await Promise.all(
    users.map(async user => {
      const app = firebase.initializeTestApp({
        projectId,
        auth: user
      });
      return app.firestore();
    })
  );

  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules', 'utf8')
  });

  return apps.length === 1 ? apps[0] : apps;
};

export const deleteApps = async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
};

describe('utils', () => {
  test('create multiple apps', async () => {
    const created = await createApps([{ uid: 'USERID1' }, { uid: 'USERID2' }]); //
    expect(created).toHaveLength(2);
  });

  test('create one apps', async () => {
    const created = await createApps([{ uid: 'USERID1' }]);
    expect(created.collection).toBeDefined();
  });
});
