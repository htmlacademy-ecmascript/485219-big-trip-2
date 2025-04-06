import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);
dayjs.extend(duration);

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function humanizeTaskDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
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

function getDuration(start, end) {
  const durationEvent = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const totalDays = Math.floor(durationEvent.asDays());
  const remainingHours = durationEvent.hours();
  const remainingMinutes = durationEvent.minutes();

  const daysStr = `${totalDays.toString().padStart(2, '0') }D`;
  const hoursStr = `${remainingHours.toString().padStart(2, '0') }H`;
  const minutesStr = `${remainingMinutes.toString().padStart(2, '0') }M`;

  return `${daysStr} ${hoursStr} ${minutesStr}`;
}

export {getRandomInteger, humanizeTaskDueDate, convertDateToISO, getDuration};

