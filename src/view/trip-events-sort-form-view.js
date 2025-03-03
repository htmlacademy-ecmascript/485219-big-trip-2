import AbstractView from '../framework/view/abstract-view';

function createTripEventsFormTemplate() {
  return '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';
}

export default class TripEventsFormView extends AbstractView {
  get template() {
    return createTripEventsFormTemplate();
  }
}
