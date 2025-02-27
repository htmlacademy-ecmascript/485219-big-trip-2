import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createTripSortEventTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--event">\n' +
    '       <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n' +
    '       <label class="trip-sort__btn" for="sort-event">Event</label>\n' +
    '     </div>';
}

export default class TripSortEventView extends AbstractView {
  get template() {
    return createTripSortEventTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }
}
