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

export {getRandomInteger, getRandomArrayElement, humanizeTaskDueDate};

