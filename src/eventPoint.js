import dayjs from 'dayjs';

function getWeightForNullDate(dateA, dateB) {
  if (!dateA && !dateB) {
    return 0;
  }

  if (!dateA) {
    return 1;
  }

  if (!dateB) {
    return -1;
  }

  return null;
}

function calculatesTravelTime(dateFrom, dateTo) {
  const date1 = dayjs(dateTo);

  return date1.diff(dateFrom, 'minute');
}

function sortEventByDate(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateTo, eventB.dateTo);

  return weight ?? dayjs(eventB.dateTo).diff(dayjs(eventA.dateTo));
}

function sortEventByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

function sortEventByTime(eventA, eventB) {
  const durationA = calculatesTravelTime(eventA.dateFrom, eventA.dateTo);
  const durationB = calculatesTravelTime(eventB.dateFrom, eventB.dateTo);
  return durationB - durationA;
}

export {sortEventByDate, sortEventByPrice, sortEventByTime};
