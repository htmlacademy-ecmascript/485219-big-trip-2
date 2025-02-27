import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createFilterFormTemplate() {
  return '<form class="trip-filters" action="#" method="get">\n' +
    '       <button class="visually-hidden" type="submit">Accept filter</button>\n' +
    '     </form>';
}

export default class RenderFilterFormView extends AbstractView {
  get template() {
    return createFilterFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }
}
