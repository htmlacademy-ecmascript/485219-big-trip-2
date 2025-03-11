import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

function createTripSortPriceTemplate() {
  return `<div class="trip-sort__item  trip-sort__item--price">
             <input id="sort-price" class="trip-sort__input  visually-hidden" data-sort-type="${SortType.PRICE}" type="radio" name="trip-sort" value="sort-price">
             <label class="trip-sort__btn" for="sort-price">Price</label>
          </div>`;
}

export default class TripSortPriceView extends AbstractView {
  get template() {
    return createTripSortPriceTemplate();
  }
}
