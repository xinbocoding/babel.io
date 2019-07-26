export const isBefore = (a, b) =>
  a.line !== b.line ? a.line < b.line : a.ch < b.ch;

export const orderRange = range => {
  const { anchor, head } = range;
  const ordered = [anchor, head].sort((a, b) => (isBefore(a, b) ? -1 : 1));
  return {
    from: ordered[0],
    to: ordered[1]
  };
};

export const computeTopCenter = (start, end) => {
  const line = Math.min(start.line, end.line);
  const ch =
    start.line === end.line
      ? Math.floor(Math.abs(start.ch - end.ch) / 2 + Math.min(start.ch, end.ch))
      : 20;

  return { line, ch };
};

export const findCurrentMark = (markers, from, to) =>
  markers.some(m => {
    const r = m.find();
    return isBefore(r.from, from) && isBefore(to, r.to);
  });
