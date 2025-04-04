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

  clear() {
    this.element.innerHTML = '';
  }
}
