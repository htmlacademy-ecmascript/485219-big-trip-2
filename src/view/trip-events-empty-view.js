import AbstractView from '../framework/view/abstract-view';
import {EmptyListMessages} from '../const';

function createEmptyTemplate(filterType, isError) {
  const message = isError
    ? EmptyListMessages.ERROR
    : EmptyListMessages[filterType.toUpperCase()] || EmptyListMessages.EVERYTHING;

  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EventsEmptyView extends AbstractView {
  #filterType;
  #isError;

  constructor(filterType = 'everything', isError = false) {
    super();
    this.#filterType = filterType;
    this.#isError = isError;
  }

  get template() {
    return createEmptyTemplate(this.#filterType, this.#isError);
  }
}
