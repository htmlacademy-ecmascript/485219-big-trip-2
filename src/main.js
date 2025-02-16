import TripFilterPresenter from './presenter/trip-filter-presenter.js';
import TripTimeFilterPresenter from './presenter/trip-time-filter-presenter.js';
import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';

const TripFilter = new TripFilterPresenter();
const TripEvents = new TripTimeFilterPresenter();
const TripEventsList = new TripEventsListPresenter();

TripFilter.init();
TripEvents.init();
TripEventsList.init();
