import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

function createTripSortTimeTemplate() {
  return `<div class="trip-sort__item  trip-sort__item--time">
            <input id="sort-time" class="trip-sort__input  visually-hidden" data-sort-type="${SortType.TIME}" type="radio" name="trip-sort" value="sort-time">
            <label class="trip-sort__btn" for="sort-time">Time</label>
          </div>`;
}

export default class TripSortTimeView extends AbstractView {
  get template() {
    return createTripSortTimeTemplate();
  }
}
