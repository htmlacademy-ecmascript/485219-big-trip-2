import EventModel from './model/events-model.js';
import TripFilterPresenter from './presenter/trip-filter-presenter.js';
import TripTimeFilterPresenter from './presenter/trip-time-filter-presenter.js';
import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';

const eventsModel = new EventModel();
const tripFilter = new TripFilterPresenter();
const tripEventsTimeFilter = new TripTimeFilterPresenter();
const tripEventsList = new TripEventsListPresenter(eventsModel);

tripFilter.init();
tripEventsTimeFilter.init();
tripEventsList.init();
