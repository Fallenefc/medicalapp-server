/* eslint-disable max-len */
const generateDatesSet = (allVisits: any) => {
  const dates = allVisits.map((visit: any) => visit.date);
  console.log(typeof dates[0]);
  const reducedArray = dates.reduce((unique: any, item: any) => unique.includes((item) ? unique : [...unique, item]));
  return reducedArray;
};

export default generateDatesSet;
