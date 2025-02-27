import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createTripSortOfferTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--offer">\n' +
    '       <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n' +
    '       <label class="trip-sort__btn" for="sort-offer">Offers</label>\n' +
    '     </div>';
}

export default class TripSortOfferView extends AbstractView {
  get template() {
    return createTripSortOfferTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }
}
