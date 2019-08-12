import { firestore } from '@firebase/testing';
import { createApps, deleteApps, updateWithApp } from './utils.test';

const USER_ID = `U${new Date().getTime()}`;
const OTHER_USER_ID = `O${new Date().getTime()}`;

const existsId = `S${new Date().getTime()}`;
const existsData = {
  userId: USER_ID,
  title: 'Example Snippet',
  mode: 'javascript',
  code: 'example();',
  note: 'example note',
  createdAt: firestore.FieldValue.serverTimestamp()
};

const ensureExistRecord = async app => {
  const ref = app.collection('snippets').doc(existsId);
  await ref.set(existsData);
};

describe('update', () => {
  let userApp;
  let otherUserApp;
  let guestApp;
  let userUpdate;
  let guestUpdate;
  let otherUserUpdate;

  beforeAll(async () => {
    [userApp, otherUserApp, guestApp] = await createApps([
      { uid: USER_ID },
      { uid: OTHER_USER_ID },
      null
    ]);
    await ensureExistRecord(userApp);
    userUpdate = updateWithApp(userApp);
    otherUserUpdate = updateWithApp(otherUserApp);
    guestUpdate = updateWithApp(guestApp);
  });

  afterAll(async () => {
    await deleteApps();
  });

  test('exists record', async () => {
    const ref = guestApp.collection('snippets').doc(existsId);
    await expect(ref.get()).toAllow();
  });

  const data = {
    title: 'Example Snippet',
    updatedAt: firestore.FieldValue.serverTimestamp()
  };

  test('ownership', async () => {
    await expect(guestUpdate(existsId, data)).toDeny();
    await expect(otherUserUpdate(existsId, data)).toDeny();
    await expect(userUpdate(existsId, data)).toAllow();
  });

  test('user id changed', async () => {
    const userIdChanged = { ...data, userId: OTHER_USER_ID };
    await expect(userUpdate(existsId, userIdChanged)).toDeny();

    const emptyUserId = { ...data, userId: '' };
    await expect(userUpdate(existsId, emptyUserId)).toDeny();

    const nullUserId = { ...data, userId: null };
    await expect(userUpdate(existsId, nullUserId)).toDeny();
  });

  test('creation time changed', async () => {
    const timeChanged = {
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await expect(userUpdate(existsId, timeChanged)).toDeny();
  });

  test('validate update time', async () => {
    // empty timestamp not allowed
    const dataEmptyTime = { ...data, createdAt: '' };
    await expect(userUpdate(existsId, dataEmptyTime)).toDeny();

    // null timestamp not allowed
    const dataNullTime = { ...data, createdAt: null };
    await expect(userUpdate(existsId, dataNullTime)).toDeny();

    // wrong timestamp not allowed
    const dataWrongTime = {
      ...data,
      updatedAt: new firestore.Timestamp()
    };
    await expect(userUpdate(existsId, dataWrongTime)).toDeny();
  });
});
