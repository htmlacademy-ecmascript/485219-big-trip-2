import {render, RenderPosition} from '../render';
import TripEventsListView from '../view/trip-events-list-view';
import EventsEmptyView from '../view/trip-events-empty-view';
import LoadingView from '../view/loading-view.js';
import TripEventPresenter from './trip-event-presenter';
import {SortType, UpdateType, UserAction} from '../const';
import {sortEventByDate, sortEventByPrice, sortEventByTime} from '../eventPoint';
import {remove} from '../framework/render';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();

export default class TripEventsList {
  #eventsModel;
  #filterModel;
  #listContainerElement;
  #currentSortType = SortType.DAY;
  #eventPresenters = new Map();

  #newEventButton = document.querySelector('.trip-main__event-add-btn');
  #isCreatingNewPoint = false;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(eventsModel, filterModel) {
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#listContainerElement = tripEventsListElement;

    document.addEventListener('sortChanged', (evt) => this.#handleSortChange(evt));

    this.#newEventButton.addEventListener('click', this.#handleNewEventButtonClick);
  }

  get eventPoints() {
    const allPoints = [...this.#eventsModel.points];
    const currentFilter = this.#filterModel.filter.type;

    const filteredPoints = this.#getFilteredEvents(allPoints, currentFilter);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortEventByDate);
      case SortType.TIME:
        return filteredPoints.sort(sortEventByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortEventByPrice);
      default:
        return filteredPoints;
    }
  }

  init() {
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelChange);

    this.#renderEventsListPoints();
  }

  #handleSortChange(evt) {
    const sortType = evt.detail.sortType;

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);

    this.#clearEventsList();
    this.#renderEventsBoard();

    this.#currentSortType = sortType;
  }

  #handleModelChange = () => {
    this.#clearEventsList();
    this.#renderEventsListPoints();
    this.#recalculateTotalCost();
  };

  #recalculateTotalCost() {
    // const events = this.#getFilteredEvents();
    // const totalCost = events.reduce((sum, event) => sum + event.price, 0);
    //
    // document.querySelector('.trip-info__cost').textContent = totalCost;
    // console.log('recalculateTotalCost');
  }

  #getFilteredEvents(eventPoints, filterType) {
    const now = new Date();

    return eventPoints.filter((point) => {
      const dateFrom = new Date(point.dateFrom);
      const dateTo = new Date(point.dateTo);

      switch (filterType) {
        case 'future':
          return dateFrom > now;
        case 'present':
          return dateFrom <= now && dateTo >= now;
        case 'past':
          return dateTo < now;
        default:
          return true;
      }
    });
  }

  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.eventPoints.sort(sortEventByDate);
        break;
      case SortType.TIME:
        this.eventPoints.sort(sortEventByTime);
        break;
      case SortType.PRICE:
        this.eventPoints.sort(sortEventByPrice);
        break;
      default:
        break;
    }
  }

  #renderEventsListPoints() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const listElement = tripEventsSectionElement.querySelector('.trip-events__list');

    if (this.eventPoints.length === 0 && !this.#isCreatingNewPoint) {
      if (listElement) {
        listElement.remove();
      }
      render(new EventsEmptyView(this.#filterModel.filter.type), tripEventsSectionElement);
      return;
    }

    const emptyView = tripEventsSectionElement.querySelector('.trip-events__msg');

    if (listElement) {
      listElement.remove();
    }
    if (emptyView) {
      emptyView.remove();
    }

    render(tripEventsListElement, tripEventsSectionElement, RenderPosition.BEFOREEND);

    this.eventPoints.forEach((point) => {
      this.#renderEventPoint(point);
    });
  }

  #renderEventPoint(point) {
    const eventPresenter = new TripEventPresenter({
      listContainerElement: tripEventsListElement,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModelEvent,
    });

    eventPresenter.init({
      point: point,
      selectedOffersData: [...this.#eventsModel.getSelectedOffers(point.type, point.offers)],
      availableOffersData: [...this.#eventsModel.getOffersByType(point.type)],
      destination: this.#eventsModel.getDestinationById(point.destination),
      eventsModel: this.#eventsModel,
    });

    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #clearEventsList({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEventsBoard() {
    const eventPoints = this.eventPoints;
    const eventPointsCount = eventPoints.length;

    if (eventPointsCount === 0) {
      return;
    }

    this.#renderEventsListPoints();
  }

  #renderLoading() {
    render(this.#loadingComponent, tripEventsSectionElement, RenderPosition.BEFOREEND);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#eventsModel.addPoint(updateType, update);
        this.#isCreatingNewPoint = false;
        this.#newEventButton.removeAttribute('disabled');
        break;
      case UserAction.DELETE_POINT:
        this.#eventsModel.deletePoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        this.#eventsModel.updatePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init();
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsListPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList({resetSortType: true});
        this.#renderEventsListPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEventsListPoints();
        break;
    }
  };

  #handleNewEventButtonClick = () => {
    if (this.#isCreatingNewPoint || this.#newEventButton.hasAttribute('disabled')) {
      return;
    }

    this.#isCreatingNewPoint = true;
    this.#newEventButton.setAttribute('disabled', '');

    this.#filterModel.setFilter(UpdateType.MAJOR, 'everything');
    this.#currentSortType = SortType.DAY;

    const newPoint = {
      id: crypto.randomUUID(),
      type: 'flight',
      destination: this.#eventsModel.getDestinations()[0].id,
      dateFrom: new Date().toISOString(),
      dateTo: new Date(Date.now() + 3600000).toISOString(),
      basePrice: 0,
      offers: [],
      isFavorite: false
    };

    const newEventPresenter = new TripEventPresenter({
      listContainerElement: tripEventsListElement,
      onDataChange: this.#handleViewAction,
      onModeChange: (mode) => {
        if (mode === 'default' && this.#isCreatingNewPoint) {
          this.#isCreatingNewPoint = false;
          this.#newEventButton.removeAttribute('disabled');
        }
        this.#handleModeChange();
      },
      isNewPoint: true
    });

    newEventPresenter.init({
      point: newPoint,
      selectedOffersData: [],
      availableOffersData: this.#eventsModel.getOffersByType('flight'),
      destination: this.#eventsModel.getDestinationById(newPoint.destination),
      eventsModel: this.#eventsModel
    });

    this.#eventPresenters.set(newPoint.id, newEventPresenter);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
