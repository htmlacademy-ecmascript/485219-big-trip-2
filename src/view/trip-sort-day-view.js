import {createElement} from '../render.js';

function createTripSortDayTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--day">\n' +
    '       <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n' +
    '       <label class="trip-sort__btn" for="sort-day">Day</label>\n' +
    '     </div>';
}

export default class TripSortDayView {
  getTemplate() {
    return createTripSortDayTemplate();
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
