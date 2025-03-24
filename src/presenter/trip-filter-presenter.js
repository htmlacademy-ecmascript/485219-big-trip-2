import {render, RenderPosition} from '../render';
import FilterEverythingView from '../view/filter-everything-view';
import FilterFutureView from '../view/filter-future-view';
import FilterFormView from '../view/filter-form-view';
import FilterPresentView from '../view/filter-present-view';
import FilterPastView from '../view/filter-past-view';

const tripControlsFilterElement = document.querySelector('.trip-controls__filters');
const filterFormElement = new FilterFormView();

export default class TripFilterPresenter {
  init() {
    render(filterFormElement, tripControlsFilterElement, RenderPosition.AFTERBEGIN);
    render(new FilterEverythingView(), filterFormElement.element);
    render(new FilterFutureView(), filterFormElement.element);
    render(new FilterPresentView(), filterFormElement.element);
    render(new FilterPastView(), filterFormElement.element);
  }
}
