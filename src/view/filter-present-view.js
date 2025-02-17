import {createElement} from '../render.js';

function createFilterPresentTemplate() {
  return '<div class="trip-filters__filter">\n' +
    '       <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n' +
    '       <label class="trip-filters__filter-label" for="filter-present">Present</label>\n' +
    '     </div>';
}

export default class FilterPresentView {
  getTemplate() {
    return createFilterPresentTemplate();
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
