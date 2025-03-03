import {render, RenderPosition} from '../render.js';
import TripEventsFormView from '../view/trip-events-sort-form-view.js';
import TripSortDayView from '../view/trip-sort-day-view.js';
import TripSortEventView from '../view/trip-sort-event-view.js';
import TripSortTimeView from '../view/trip-sort-time-view.js';
import TripSortPriceView from '../view/trip-sort-price-view.js';
import TripSortOfferView from '../view/trip-sort-offer-view.js';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsFormElement = new TripEventsFormView();

export default class TripTimeFilterPresenter {
  init() {
    render(tripEventsFormElement, tripEventsSectionElement, RenderPosition.AFTERBEGIN);
    render(new TripSortDayView(), tripEventsFormElement.element);
    render(new TripSortEventView(), tripEventsFormElement.element);
    render(new TripSortTimeView(), tripEventsFormElement.element);
    render(new TripSortPriceView(), tripEventsFormElement.element);
    render(new TripSortOfferView(), tripEventsFormElement.element);
  }
}


