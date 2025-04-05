import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';


dayjs.extend(minMax);

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrayElement(array) {
  const randomIndex = getRandomInteger(0, array.length);
  return array[randomIndex];
}

function humanizeTaskDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function updateEvent(eventsPoints, updatedEventPoint) {
  return eventsPoints.map((eventPoint) => eventPoint.id === updatedEventPoint.id ? updatedEventPoint : eventPoint);
}

const convertDateToISO = (date) => {
  if (!date) {
    return null;
  }

  if (typeof date === 'string' && date.endsWith('Z')) {
    return date;
  }

  if (typeof date === 'string') {
    const [day, month, year, hour, minute] = date.split(/[/ :]/);
    const fullYear = `20${year}`;
    const dateObj = new Date(`${fullYear}-${month}-${day}T${hour}:${minute}:00.000Z`);
    return dateObj.toISOString();
  }

  if (date instanceof Date) {
    return date.toISOString();
  }

  return null;
};

export {getRandomInteger, getRandomArrayElement, humanizeTaskDueDate, updateEvent, convertDateToISO};

