import { firestore } from '@firebase/testing';
import { deleteApps, createClients } from './utils.test';

const USER_ID = `U${new Date().getTime()}`;
const OTHER_USER_ID = `O${new Date().getTime()}`;

const existsId = `S${new Date().getTime()}`;
const existsData = {
  userId: USER_ID,
  title: 'Example Snippet',
  lang: 'javascript',
  code: 'example();',
  note: 'example note',
  createdAt: firestore.FieldValue.serverTimestamp()
};

describe('update snippet', () => {
  let user;
  let otherUser;
  let guest;

  beforeAll(async () => {
    [user, otherUser, guest] = await createClients([
      { uid: USER_ID },
      { uid: OTHER_USER_ID },
      null
    ]);
  });

  afterAll(async () => {
    await deleteApps();
  });

  test('ensure exists record', async () => {
    await expect(user.createWithId(existsId, existsData)).toAllow();
  });

  const data = {
    title: 'Example Snippet',
    updatedAt: firestore.FieldValue.serverTimestamp()
  };

  test('ownership', async () => {
    await expect(guest.update(existsId, data)).toDeny();
    await expect(otherUser.update(existsId, data)).toDeny();
    await expect(user.update(existsId, data)).toAllow();
  });

  test('user id changed', async () => {
    const userIdChanged = { ...data, userId: OTHER_USER_ID };
    await expect(user.update(existsId, userIdChanged)).toDeny();

    const emptyUserId = { ...data, userId: '' };
    await expect(user.update(existsId, emptyUserId)).toDeny();

    const nullUserId = { ...data, userId: null };
    await expect(user.update(existsId, nullUserId)).toDeny();
  });

  test('creation time changed', async () => {
    const timeChanged = {
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await expect(user.update(existsId, timeChanged)).toDeny();
  });

  test('validate update time', async () => {
    // empty timestamp not allowed
    const dataEmptyTime = { ...data, createdAt: '' };
    await expect(user.update(existsId, dataEmptyTime)).toDeny();

    // null timestamp not allowed
    const dataNullTime = { ...data, createdAt: null };
    await expect(user.update(existsId, dataNullTime)).toDeny();

    // wrong timestamp not allowed
    const dataWrongTime = {
      ...data,
      updatedAt: new firestore.Timestamp()
    };
    await expect(user.update(existsId, dataWrongTime)).toDeny();
  });
});
