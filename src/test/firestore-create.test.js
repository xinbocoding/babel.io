import { firestore } from '@firebase/testing';
import { createApps, deleteApps, createWithApp } from './utils.test';

const baseDataForAllTest = {
  title: 'Example Snippet',
  mode: 'javascript',
  code: 'example();',
  note: 'example note',
  createdAt: firestore.FieldValue.serverTimestamp()
};

describe('guest', () => {
  let app;
  let create;
  beforeAll(async () => {
    app = await createApps();
    create = createWithApp(app);
  });

  afterAll(async () => {
    await deleteApps();
  });

  const baseData = baseDataForAllTest;

  test('guest can not create snippet', async () => {
    await expect(create(baseData)).toDeny();
  });

  test('guest can not create snippet with userId=null', async () => {
    const data = { ...baseData, userId: null };
    await expect(create(data)).toDeny();
  });
});

describe('signed-in user', () => {
  const USER_ID = `U${new Date().getTime()}`;

  let app;
  let create;
  beforeAll(async () => {
    app = await createApps({ uid: USER_ID });
    create = createWithApp(app);
  });

  afterAll(async () => {
    await deleteApps();
  });

  const baseData = { ...baseDataForAllTest, userId: USER_ID };

  test('valid fields', async () => {
    await expect(create(baseData)).toAllow();
  });

  Object.keys(baseData).forEach(key => {
    test(`without key ${key}`, async () => {
      const absentField = { ...baseData };
      delete absentField[key];
      await expect(create(absentField)).toDeny();
    });
  });

  test('extra key', async () => {
    const extraKey = { ...baseData, extraKeyName: 'extraValue' };
    await expect(create(extraKey)).toDeny();
  });

  // Fields
  test(`validate userId`, async () => {
    // wrong user id
    const data = { ...baseData, userId: 'WRONG-USER-ID' };
    await expect(create(data)).toDeny();

    // null user id
    const nullUserId = { ...baseData, userId: null };
    await expect(create(nullUserId)).toDeny();

    // empty user id
    const blankUserId = { ...baseData, userId: '' };
    await expect(create(blankUserId)).toDeny();
  });

  test(`validate mode`, async () => {
    // empty mode
    const blankMode = { ...baseData, mode: '' };
    await expect(create(blankMode)).toDeny();

    // null mode
    const nullMode = { ...baseData, mode: null };
    await expect(create(nullMode)).toDeny();

    // unknown mode name
    const unknownName = { ...baseData, mode: 'unknown-a8df2h' };
    await expect(create(unknownName)).toDeny();
  });

  test('validate title', async () => {
    // blank title
    const blankTitle = { ...baseData, title: '' };
    await expect(create(blankTitle)).toDeny();

    // null title
    const nullTitle = { ...baseData, title: null };
    await expect(create(nullTitle)).toDeny();

    // long title but still valid
    const longValid = { ...baseData, title: 'c'.repeat(1499) };
    await expect(create(longValid)).toAllow();

    // long title that exceed 1500
    const limitExceeded = { ...baseData, title: 'c'.repeat(1500) };
    await expect(create(limitExceeded)).toDeny();
  });

  test(`invalid note`, async () => {
    // empty note
    const emptyNote = { ...baseData, note: '' };
    await expect(create(emptyNote)).toAllow();

    // empty note
    const nullNote = { ...baseData, note: null };
    await expect(create(nullNote)).toAllow();

    // too long < 10000
    const longNote = { ...baseData, note: 'N'.repeat(9999) };
    await expect(create(longNote)).toAllow();

    // too long >= 10000
    const noteExceeded = { ...baseData, note: 'N'.repeat(10000) };
    await expect(create(noteExceeded)).toDeny();
  });

  test(`invalid code`, async () => {
    // empty code is allowed
    const emptyCode = { ...baseData, note: '' };
    await expect(create(emptyCode)).toAllow();

    // null code is allowed
    const nullCode = { ...baseData, note: null };
    await expect(create(nullCode)).toAllow();

    // length < 10000 is allowed
    const longCode = { ...baseData, note: 'N'.repeat(9999) };
    await expect(create(longCode)).toAllow();

    // long >= 10000 is not allowed
    const longExceeded = { ...baseData, note: 'N'.repeat(10000) };
    await expect(create(longExceeded)).toDeny();
  });

  test(`validate createdAt`, async () => {
    // empty timestamp not allowed
    const dataEmptyTime = { ...baseData, createdAt: '' };
    await expect(create(dataEmptyTime)).toDeny();

    // null timestamp not allowed
    const dataNullTime = { ...baseData, createdAt: null };
    await expect(create(dataNullTime)).toDeny();

    // wrong timestamp not allowed
    const dataWrongTime = {
      ...baseData,
      createdAt: new firestore.Timestamp()
    };
    await expect(create(dataWrongTime)).toDeny();
  });
});
