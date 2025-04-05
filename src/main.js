import EventModel from './model/events-model';
import FilterModel from './model/filter-model.js';
import TripFilterPresenter from './presenter/trip-filter-presenter';
import TripEventsFilterPresenter from './presenter/trip-events-filter-presenter';
import TripEventsListPresenter from './presenter/trip-events-list-presenter';
import EventPointsApiService from './event-point-api-service';
import TripInfoPresenter from './presenter/trip-info-presenter';

const AUTHORIZATION = 'Basic 5e6by45y45ynm67i';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const eventsModel = new EventModel({
  eventPointsApiService: new EventPointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const tripFilter = new TripFilterPresenter(filterModel, eventsModel);
const tripEventsTimeFilter = new TripEventsFilterPresenter();
const tripEventsList = new TripEventsListPresenter(eventsModel, filterModel);

const tripInfo = new TripInfoPresenter({
  container: document.querySelector('.trip-main'),
  eventsModel,
  destinationsModel: eventsModel,
  offersModel: eventsModel,
});

eventsModel.init();

tripFilter.init();
tripEventsTimeFilter.init();
tripEventsList.init();
tripInfo.init();
