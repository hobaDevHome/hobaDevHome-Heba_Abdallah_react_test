export const generateKey = (pre) => {
  // return `${pre}_${new Date().getTime()}`;
  let rand = Math.floor(Math.random() * 10000000);
  return `${pre}_${rand}`;
};
