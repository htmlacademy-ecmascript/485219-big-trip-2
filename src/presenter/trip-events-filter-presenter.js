import {render, RenderPosition} from '../render.js';
import TripEventsFormView from '../view/trip-events-sort-form-view.js';
import TripSortDayView from '../view/trip-sort-day-view.js';
import TripSortEventView from '../view/trip-sort-event-view.js';
import TripSortTimeView from '../view/trip-sort-time-view.js';
import TripSortPriceView from '../view/trip-sort-price-view.js';
import TripSortOfferView from '../view/trip-sort-offer-view.js';

const tripEventsSectionElement = document.querySelector('.trip-events');
// const tripEventsFormElement = new TripEventsFormView();


export default class TripEventsFilterPresenter {
  #sortComponent;
  #tripEventsFormElement;

  constructor() {
    this.#tripEventsFormElement = new TripEventsFormView({onSortTypeChange: this.#handleSortTypeChange});
  }

  init() {
    render(this.#tripEventsFormElement, tripEventsSectionElement, RenderPosition.AFTERBEGIN);
    render(new TripSortDayView(), this.#tripEventsFormElement.element);
    render(new TripSortEventView(), this.#tripEventsFormElement.element);
    render(new TripSortTimeView(), this.#tripEventsFormElement.element);
    render(new TripSortPriceView(), this.#tripEventsFormElement.element);
    render(new TripSortOfferView(), this.#tripEventsFormElement.element);
  }

  #handleSortTypeChange(sortType) {
    const event = new CustomEvent('sortChanged', { detail: { sortType } });
    document.dispatchEvent(event);
  }
}


