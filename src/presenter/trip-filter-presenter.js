import {render, RenderPosition} from '../render';
import FiltersView from '../view/filters-view';
import FilterFormView from '../view/filter-form-view';
import {generateFilter} from '../filter';

const tripControlsFilterElement = document.querySelector('.trip-controls__filters');

export default class TripFilterPresenter {
  #filterModel;
  #eventsModel;
  #currentFilterType;
  #filterFormElement = new FilterFormView();
  #currentFiltersView = null;

  constructor(filterModel, eventsModel) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#currentFilterType = this.#filterModel.filter;
    this.#handleFilterChange = this.#handleFilterChange.bind(this);
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    render(this.#filterFormElement, tripControlsFilterElement, RenderPosition.AFTERBEGIN);
    this.#renderFilters();
  }

  #renderFilters() {
    this.#filterFormElement.element.innerHTML = '';

    const filters = generateFilter(this.#eventsModel.points).map((filter) => ({
      ...filter,
      isDisabled: this.#eventsModel.points.every((eventPoint) => !this.#applyFilter(eventPoint, filter.type))
    }));

    this.#currentFiltersView = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter.type,
      onFilterChange: this.#handleFilterChange
    });

    render(this.#currentFiltersView, this.#filterFormElement.element);
  }

  #applyFilter(eventPoint, filterType) {
    const now = new Date();
    const eventDateFrom = new Date(eventPoint.dateFrom);
    const eventDateTo = new Date(eventPoint.dateTo);

    return {
      future: eventDateFrom > now,
      present: eventDateFrom <= now && eventDateTo >= now,
      past: eventDateTo < now,
    }[filterType] ?? true;
  }

  #handleModelEvent = () => {
    this.#renderFilters();
  };

  #handleFilterChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }

    this.#currentFilterType = filterType;
    this.#filterModel.setFilter('major', filterType);
  };
}
