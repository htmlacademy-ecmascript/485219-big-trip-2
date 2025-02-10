import {render, RenderPosition} from './render.js';
import RenderFilterEverythingView from './view/filter-everything-view.js';
import RenderFilterFutureView from './view/filter-future-view.js';
import RenderFilterFormView from './view/filter-form-view.js';
import FilterPresentView from './view/filter-present-view.js';
import FilterPastView from './view/filter-past-view.js';

const tripControlsFilterElement = document.querySelector('.trip-controls__filters');
const filterFormElement = new RenderFilterFormView();

render(filterFormElement, tripControlsFilterElement, RenderPosition.AFTERBEGIN);
render(new RenderFilterEverythingView(), filterFormElement.getElement());
render(new RenderFilterFutureView(), filterFormElement.getElement());
render(new FilterPresentView(), filterFormElement.getElement());
render(new FilterPastView(), filterFormElement.getElement());
