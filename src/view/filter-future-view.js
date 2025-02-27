import AbstractView from '../framework/view/abstract-view';

function createFilterFutureTemplate() {
  return '<div class="trip-filters__filter">\n' +
    '       <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n' +
    '       <label class="trip-filters__filter-label" for="filter-future">Future</label>\n' +
    '     </div>';
}

export default class RenderFilterFutureView extends AbstractView {
  get template() {
    return createFilterFutureTemplate();
  }
}
