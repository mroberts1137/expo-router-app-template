// gives UTC time
export const getDateString = (date = new Date()) =>
  date.toISOString().split('T')[0];

export const areDifferentDays = (date1, date2, dayDiff = 0) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d2.setDate(d2.getDate() + dayDiff);
  return d1.toISOString().split('T')[0] !== d2.toISOString().split('T')[0];
};

export const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
};
