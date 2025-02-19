function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrayElement(array) {
  const randomIndex = getRandomInteger(0, array.length);
  return array[randomIndex];
}

export {getRandomInteger, getRandomArrayElement};

