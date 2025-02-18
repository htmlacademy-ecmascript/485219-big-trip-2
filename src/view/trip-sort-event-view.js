import {createElement} from '../render.js';

function createTripSortEventTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--event">\n' +
    '       <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n' +
    '       <label class="trip-sort__btn" for="sort-event">Event</label>\n' +
    '     </div>';
}

export default class TripSortEventView {
  getTemplate() {
    return createTripSortEventTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
