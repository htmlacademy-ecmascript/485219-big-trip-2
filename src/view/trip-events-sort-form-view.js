import AbstractView from '../framework/view/abstract-view';

function createTripEventsFormTemplate() {
  return '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';
}

export default class TripEventsFormView extends AbstractView {
  #handleSortTypeChange;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTripEventsFormTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}


