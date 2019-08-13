import { firestore } from '@firebase/testing';
import { deleteApps, createClients } from './utils.test';

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

  test('guest can not delete', async () => {
    await expect(guest.delete(existsId)).toDeny();
  });

  test('other user can not delete', async () => {
    await expect(otherUser.delete(existsId)).toDeny();
  });

  test('owner can not delete', async () => {
    await expect(user.delete(existsId)).toAllow();
  });
});
