import {render, RenderPosition} from './render.js';
import FilterEverythingView from './view/filter-everything-view.js';
import FilterFutureView from './view/filter-future-view.js';
import FilterFormView from './view/filter-form-view.js';
import FilterPresentView from './view/filter-present-view.js';
import FilterPastView from './view/filter-past-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const tripControlsFilterElement = document.querySelector('.trip-controls__filters');
const filterFormElement = new FilterFormView();

render(filterFormElement, tripControlsFilterElement, RenderPosition.AFTERBEGIN);
render(new FilterEverythingView(), filterFormElement.getElement());
render(new FilterFutureView(), filterFormElement.getElement());
render(new FilterPresentView(), filterFormElement.getElement());
render(new FilterPastView(), filterFormElement.getElement());
TripEventsPresenter.init();
