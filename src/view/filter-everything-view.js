import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createFilterEverythingTemplate() {
  return '<div class="trip-filters__filter">\n' +
    '       <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n' +
    '       <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n' +
    '     </div>';
}

export default class RenderFilterEverythingView extends AbstractView{
  get template() {
    return createFilterEverythingTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }
}
