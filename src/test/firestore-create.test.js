import { firestore } from '@firebase/testing';
import { deleteApps, createClients } from './utils.test';

const USER_ID = `U${new Date().getTime()}`;

const baseDataForAllTest = {
  title: 'Example Snippet',
  lang: 'javascript',
  code: 'example();',
  note: 'example note',
  createdAt: firestore.FieldValue.serverTimestamp()
};

describe('create snippet', () => {
  let user;
  let guest;
  beforeAll(async () => {
    [guest, user] = await createClients([null, { uid: USER_ID }]);
  });

  afterAll(async () => {
    await deleteApps();
  });

  const guestBaseData = baseDataForAllTest;

  test('guest can not create snippet', async () => {
    await expect(guest.create(guestBaseData)).toDeny();
  });

  test('guest can not create snippet with userId=null', async () => {
    const data = { ...guestBaseData, userId: null };
    await expect(guest.create(data)).toDeny();
  });

  const baseData = { ...baseDataForAllTest, userId: USER_ID };

  test('valid fields', async () => {
    await expect(user.create(baseData)).toAllow();
  });

  Object.keys(baseData).forEach(key => {
    test(`without key ${key}`, async () => {
      const absentField = { ...baseData };
      delete absentField[key];
      await expect(user.create(absentField)).toDeny();
    });
  });

  test('extra key', async () => {
    const extraKey = { ...baseData, extraKeyName: 'extraValue' };
    await expect(user.create(extraKey)).toDeny();
  });

  // Fields
  test(`validate userId`, async () => {
    // wrong user id
    const data = { ...baseData, userId: 'WRONG-USER-ID' };
    await expect(user.create(data)).toDeny();

    // null user id
    const nullUserId = { ...baseData, userId: null };
    await expect(user.create(nullUserId)).toDeny();

    // empty user id
    const blankUserId = { ...baseData, userId: '' };
    await expect(user.create(blankUserId)).toDeny();
  });

  test(`validate lang`, async () => {
    // empty lang
    const blankLang = { ...baseData, lang: '' };
    await expect(user.create(blankLang)).toDeny();

    // null lang
    const nullLang = { ...baseData, lang: null };
    await expect(user.create(nullLang)).toDeny();

    // unknown lang name
    const unknownName = { ...baseData, lang: 'unknown-a8df2h' };
    await expect(user.create(unknownName)).toDeny();
  });

  test('validate title', async () => {
    // blank title
    const blankTitle = { ...baseData, title: '' };
    await expect(user.create(blankTitle)).toDeny();

    // null title
    const nullTitle = { ...baseData, title: null };
    await expect(user.create(nullTitle)).toDeny();

    // long title but still valid
    const longValid = { ...baseData, title: 'c'.repeat(1499) };
    await expect(user.create(longValid)).toAllow();

    // long title that exceed 1500
    const limitExceeded = { ...baseData, title: 'c'.repeat(1500) };
    await expect(user.create(limitExceeded)).toDeny();
  });

  test(`invalid note`, async () => {
    // empty note
    const emptyNote = { ...baseData, note: '' };
    await expect(user.create(emptyNote)).toAllow();

    // empty note
    const nullNote = { ...baseData, note: null };
    await expect(user.create(nullNote)).toAllow();

    // too long < 10000
    const longNote = { ...baseData, note: 'N'.repeat(9999) };
    await expect(user.create(longNote)).toAllow();

    // too long >= 10000
    const noteExceeded = { ...baseData, note: 'N'.repeat(10000) };
    await expect(user.create(noteExceeded)).toDeny();
  });

  test(`invalid code`, async () => {
    // empty code is allowed
    const emptyCode = { ...baseData, note: '' };
    await expect(user.create(emptyCode)).toAllow();

    // null code is allowed
    const nullCode = { ...baseData, note: null };
    await expect(user.create(nullCode)).toAllow();

    // length < 10000 is allowed
    const longCode = { ...baseData, note: 'N'.repeat(9999) };
    await expect(user.create(longCode)).toAllow();

    // long >= 10000 is not allowed
    const longExceeded = { ...baseData, note: 'N'.repeat(10000) };
    await expect(user.create(longExceeded)).toDeny();
  });

  test(`validate createdAt`, async () => {
    // empty timestamp not allowed
    const dataEmptyTime = { ...baseData, createdAt: '' };
    await expect(user.create(dataEmptyTime)).toDeny();

    // null timestamp not allowed
    const dataNullTime = { ...baseData, createdAt: null };
    await expect(user.create(dataNullTime)).toDeny();

    // wrong timestamp not allowed
    const dataWrongTime = {
      ...baseData,
      createdAt: new firestore.Timestamp()
    };
    await expect(user.create(dataWrongTime)).toDeny();
  });
});
