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

const fromEntries = l => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

export const ModeDict = fromEntries(
  ModeList.map(item => {
    return [item.key, item];
  })
);
