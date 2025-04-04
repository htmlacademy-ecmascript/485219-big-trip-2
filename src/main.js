import EventModel from './model/events-model';
import FilterModel from './model/filter-model.js';
import TripFilterPresenter from './presenter/trip-filter-presenter';
import TripEventsFilterPresenter from './presenter/trip-events-filter-presenter';
import TripEventsListPresenter from './presenter/trip-events-list-presenter';

const eventsModel = new EventModel();
const filterModel = new FilterModel();

const tripFilter = new TripFilterPresenter(filterModel, eventsModel);
const tripEventsTimeFilter = new TripEventsFilterPresenter();
const tripEventsList = new TripEventsListPresenter(eventsModel, filterModel); // Передали filterModel

tripFilter.init();
tripEventsTimeFilter.init();

tripEventsList.init();
