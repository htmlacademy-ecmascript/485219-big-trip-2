import {createElement} from '../render.js';

function createFilterPastTemplate() {
  return '<div class="trip-filters__filter">\n' +
    '       <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n' +
    '       <label class="trip-filters__filter-label" for="filter-past">Past</label>\n' +
    '     </div>';
}

export default class FilterPastView {
  getTemplate() {
    return createFilterPastTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
