import AbstractView from '../framework/view/abstract-view';
import {EmptyListMessages} from '../const';

function createEmptyTemplate(filterType) {
  const message = EmptyListMessages[filterType.toUpperCase()] || EmptyListMessages.EVERYTHING;

  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EventsEmptyView extends AbstractView {
  #filterType;

  constructor(filterType = 'everything') {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }
}
