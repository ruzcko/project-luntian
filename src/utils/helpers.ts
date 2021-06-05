export const rand = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const formatDate = (n: Date) => {
  let h = n.getHours().toString();
  let m = n.getMinutes().toString();
  h = h.length === 1 ? `0${h}` : h;
  m = m.length === 1 ? `0${m}` : m;
  return `${h}:${m}`;
};
