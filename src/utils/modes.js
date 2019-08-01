export const ModeList = [
  {
    key: 'javascript',
    label: 'JavaScript',
    file: 'javascript',
    mime: 'text/javascript'
  },
  {
    key: 'json',
    label: 'Json',
    file: 'json',
    mime: 'application/json'
  },
  {
    key: 'scala',
    label: 'Scala',
    file: 'clike',
    mime: 'text/x-scala'
  }
];

export const ModeDict = Object.fromEntries(
  ModeList.map(item => {
    return [item.key, item];
  })
);
