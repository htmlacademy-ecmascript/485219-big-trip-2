import AbstractView from '../framework/view/abstract-view';

function createTripSortPriceTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--price">\n' +
    '              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n' +
    '              <label class="trip-sort__btn" for="sort-price">Price</label>\n' +
    '            </div>';
}

export default class TripSortPriceView extends AbstractView {
  get template() {
    return createTripSortPriceTemplate();
  }
}
