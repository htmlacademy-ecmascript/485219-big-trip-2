import {createElement} from '../render.js';

function createTripSortTimeTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--time">\n' +
    '       <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n' +
    '       <label class="trip-sort__btn" for="sort-time">Time</label>\n' +
    '     </div>';
}

export default class TripSortTimeView {
  getTemplate() {
    return createTripSortTimeTemplate();
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
