import {render, RenderPosition} from '../render.js';
import TripEventsFormView from '../view/trip-events-sort-form-view.js';
import TripSortView from '../view/trip-sort-view.js';
// import TripSortEventView from '../view/trip-sort-event-view.js';
// import TripSortTimeView from '../view/trip-sort-time-view.js';
// import TripSortPriceView from '../view/trip-sort-price-view.js';
// import TripSortOfferView from '../view/trip-sort-offer-view.js';

const tripEventsSectionElement = document.querySelector('.trip-events');

export default class TripEventsFilterPresenter {
  #tripEventsFormElement;

  constructor() {
    this.#tripEventsFormElement = new TripEventsFormView({onSortTypeChange: this.#handleSortTypeChange});
  }

  init() {
    render(this.#tripEventsFormElement, tripEventsSectionElement, RenderPosition.AFTERBEGIN);
    render(new TripSortView(), this.#tripEventsFormElement.element);
    // render(new TripSortEventView(), this.#tripEventsFormElement.element);
    // render(new TripSortTimeView(), this.#tripEventsFormElement.element);
    // render(new TripSortPriceView(), this.#tripEventsFormElement.element);
    // render(new TripSortOfferView(), this.#tripEventsFormElement.element);
  }

  #handleSortTypeChange(sortType) {
    const event = new CustomEvent('sortChanged', { detail: { sortType } });
    document.dispatchEvent(event);
  }
}


