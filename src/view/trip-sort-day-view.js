import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

function createTripSortDayTemplate() {
  return `<div class="trip-sort__item  trip-sort__item--day">
            <input id="sort-day" class="trip-sort__input  visually-hidden" data-sort-type="${SortType.DAY}" type="radio" name="trip-sort" value="sort-day" checked>
            <label class="trip-sort__btn" for="sort-day">Day</label>
          </div>`;
}

export default class TripSortDayView extends AbstractView {
  get template() {
    return createTripSortDayTemplate();
  }
}
