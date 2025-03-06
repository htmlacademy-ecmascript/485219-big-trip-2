import AbstractView from '../framework/view/abstract-view';

function createFilterPastTemplate() {
  return '<div class="trip-filters__filter">\n' +
    '       <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n' +
    '       <label class="trip-filters__filter-label" for="filter-past">Past</label>\n' +
    '     </div>';
}

export default class FilterPastView extends AbstractView{
  get template() {
    return createFilterPastTemplate();
  }
}
