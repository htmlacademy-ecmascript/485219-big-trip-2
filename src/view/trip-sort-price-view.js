import {createElement} from '../render.js';

function createTripSortPriceTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--price">\n' +
    '              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n' +
    '              <label class="trip-sort__btn" for="sort-price">Price</label>\n' +
    '            </div>';
}

export default class TripSortPriceView {
  getTemplate() {
    return createTripSortPriceTemplate();
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
