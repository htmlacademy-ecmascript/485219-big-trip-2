import {createElement} from '../render.js';

function createFilterFutureTemplate() {
  return '<div class="trip-filters__filter">\n' +
    '       <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n' +
    '       <label class="trip-filters__filter-label" for="filter-future">Future</label>\n' +
    '     </div>';
}

export default class RenderFilterFutureView {
  getTemplate() {
    return createFilterFutureTemplate();
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
