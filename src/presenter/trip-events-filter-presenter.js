import {render, RenderPosition} from '../render';
import TripEventsFormView from '../view/trip-events-sort-form-view';
import TripSortView from '../view/trip-sort-view';

const tripEventsSectionElement = document.querySelector('.trip-events');

export default class TripEventsFilterPresenter {
  #tripEventsFormElement;

  constructor() {
    this.#tripEventsFormElement = new TripEventsFormView({onSortTypeChange: this.#handleSortTypeChange});
  }

  init() {
    render(this.#tripEventsFormElement, tripEventsSectionElement, RenderPosition.AFTERBEGIN);
    render(new TripSortView(), this.#tripEventsFormElement.element);
  }

  #handleSortTypeChange(sortType) {
    const event = new CustomEvent('sortChanged', { detail: { sortType } });
    document.dispatchEvent(event);
  }
}


