import EventModel from './model/events-model';
import TripFilterPresenter from './presenter/trip-filter-presenter';
import TripEventsFilterPresenter from './presenter/trip-events-filter-presenter';
import TripEventsListPresenter from './presenter/trip-events-list-presenter';

const eventsModel = new EventModel();
const tripFilter = new TripFilterPresenter();
const tripEventsTimeFilter = new TripEventsFilterPresenter();
const tripEventsList = new TripEventsListPresenter(eventsModel);

tripFilter.init();
tripEventsTimeFilter.init();
tripEventsList.init();
