import Observable from '../framework/observable.js';
import { FILTERS } from '../const.js';

export default class FilterModel extends Observable {
  #defaultFilter = FILTERS.find((filter) => filter.type === 'everything');
  #filter = this.#defaultFilter;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filterType) {
    const newFilter = FILTERS.find((filter) => filter.type === filterType) || this.#defaultFilter;

    if (this.#filter.type === newFilter.type) {
      return;
    }

    this.#filter = newFilter;
    this._notify(updateType, newFilter);
  }
}
