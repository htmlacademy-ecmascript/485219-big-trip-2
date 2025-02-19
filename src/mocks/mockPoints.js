import {getRandomInteger, getRandomArrayElement} from '../utils.js';

export const mockPoints = [
  {
    'id': '4MBPP39p0kUz',
    'basePrice': getRandomInteger(10, 30),
    'dateFrom': '2019-10-10T12:10:59.845Z',
    'dateTo': '2019-11-10T12:22:13.375Z',
    'destination': 'siUUzvCFizdQ',
    'isFavorite': !!getRandomInteger(0, 1),
    'offers': [
      'tKsBEg6wGGCG',
      'qQK68Pzrrsjj',
      '3LlX1bwprmRc'
    ],
    'type': 'taxi'
  },
  {
    'id': 'RbjoEG8ZWf1u',
    'basePrice': getRandomInteger(40, 160),
    'dateFrom': '2020-07-10T22:55:56.845Z',
    'dateTo': '2020-07-11T11:22:13.375Z',
    'destination': 'Sza1LJiBjOji',
    'isFavorite': !!getRandomInteger(0, 1),
    'offers': [
      'GM3MnKNc8LOD',
      'osoqia7I1bvO'
    ],
    'type': 'train'
  },
  {
    'id': 'ar5keKFQNrrs',
    'basePrice': getRandomInteger(100, 400),
    'dateFrom': '2021-07-10T22:55:56.845Z',
    'dateTo': '2021-07-11T11:22:13.375Z',
    'destination': 'YST7gQpgFLu0',
    'isFavorite': !!getRandomInteger(0, 1),
    'offers': [
      '3GqzIfqz9uIJ',
      '9KCjC9XS9LNr'
    ],
    'type': 'flight'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
