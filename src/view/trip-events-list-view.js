import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createTripEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripEventsListView extends AbstractView {
  get template() {
    return createTripEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }
}
