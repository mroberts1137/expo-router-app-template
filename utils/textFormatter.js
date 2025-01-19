export const textFormatter = (str) => {
  return str
    .toLowerCase()
    .replace('-', ' ')
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
};
