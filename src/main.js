import TripFilterPresenter from './presenter/trip-filter-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';

const TripFilter = new TripFilterPresenter();
const TripEvents = new TripEventsPresenter();
const TripEventsList = new TripEventsListPresenter();

TripFilter.init();
TripEvents.init();
TripEventsList.init();

