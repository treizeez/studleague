export const generateSession = (length = 50) =>
  [...Array(length + 10)]
    .map((value) => (Math.random() * 1000000).toString(36).replace(".", ""))
    .join("")
    .substring(0, length);
