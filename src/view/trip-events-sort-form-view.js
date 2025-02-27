import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createTripEventsFormTemplate() {
  return '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';
}

export default class TripEventsFormView extends AbstractView {
  get template() {
    return createTripEventsFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }
}
