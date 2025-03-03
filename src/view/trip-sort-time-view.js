import AbstractView from '../framework/view/abstract-view';

function createTripSortTimeTemplate() {
  return '<div class="trip-sort__item  trip-sort__item--time">\n' +
    '       <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n' +
    '       <label class="trip-sort__btn" for="sort-time">Time</label>\n' +
    '     </div>';
}

export default class TripSortTimeView extends AbstractView {
  get template() {
    return createTripSortTimeTemplate();
  }
}
