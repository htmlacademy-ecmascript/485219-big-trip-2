import EventModel from './model/events-model.js';
import TripFilterPresenter from './presenter/trip-filter-presenter.js';
import TripTimeFilterPresenter from './presenter/trip-time-filter-presenter.js';
import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';

const eventsModel = new EventModel();
const TripFilter = new TripFilterPresenter();
const TripEventsTimeFilter = new TripTimeFilterPresenter();
const TripEventsList = new TripEventsListPresenter(eventsModel);

TripFilter.init();
TripEventsTimeFilter.init();
TripEventsList.init();
