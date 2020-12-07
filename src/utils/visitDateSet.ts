/* eslint-disable max-len */
const generateDatesSet = (allVisits: any) => {
  const dates = allVisits.map((visit: any) => visit.date);
  const datesSet = new Set(dates);
  return datesSet;
};

export default generateDatesSet;
