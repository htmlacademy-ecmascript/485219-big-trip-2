const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const FILTERS = [
  {
    type: 'everything',
    filter: (events) => events.filter((event) => event),
    isChecked: true,
  },
  {
    type: 'future',
    filter: (events) => events.filter((event) => event.dateTo > new Date()),
    isChecked: false,
  },
  {
    type: 'present',
    filter: (events) => events.filter((event) => event.dateTo > new Date() && event.dateFrom < new Date()),
    isChecked: false,
  },
  {
    type: 'past',
    filter: (events) => events.filter((event) => event.dateFrom < new Date()),
    isChecked: false,
  },
];

const EmptyListMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
  ERROR: 'Failed to load latest route information'
};

export {DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT, SortType, UserAction, UpdateType, FILTERS, EmptyListMessages};
