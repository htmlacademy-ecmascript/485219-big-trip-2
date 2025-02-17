import {createElement} from '../render.js';

function createFilterFormTemplate() {
  return '<form class="trip-filters" action="#" method="get">\n' +
    '       <button class="visually-hidden" type="submit">Accept filter</button>\n' +
    '     </form>';
}

export default class RenderFilterFormView {
  getTemplate() {
    return createFilterFormTemplate();
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
