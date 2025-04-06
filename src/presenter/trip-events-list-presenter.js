import {render, RenderPosition} from '../render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import TripEventsListView from '../view/trip-events-list-view';
import EventsEmptyView from '../view/trip-events-empty-view';
import LoadingView from '../view/loading-view.js';
import TripEventPresenter from './trip-event-presenter';
import {SortType, UpdateType, UserAction} from '../const';
import {sortEventByDate, sortEventByPrice, sortEventByTime} from '../eventPoint';
import {remove} from '../framework/render';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

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
  #isError = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

    this.#currentSortType = sortType;

    this.#clearEventsList();
    this.#renderEventsBoard();
  }

  #handleModelChange = () => {
    this.#clearEventsList();
    this.#renderEventsListPoints();
  };

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

  #renderEventsListPoints() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#isError) {
      render(new EventsEmptyView(this.#filterModel.filter.type, this.#isError), tripEventsSectionElement);
      return;
    }

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
      onModeChange: this.#handleModeChange,
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.addPoint(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
          throw new Error(err);
        }
        this.#isCreatingNewPoint = false;
        this.#newEventButton.removeAttribute('disabled');
        break;
      case UserAction.DELETE_POINT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.UPDATE_POINT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init({
          point: data,
          selectedOffersData: [...this.#eventsModel.getSelectedOffers(data.type, data.offers)],
          availableOffersData: [...this.#eventsModel.getOffersByType(data.type)],
          destination: this.#eventsModel.getDestinationById(data.destination),
          eventsModel: this.#eventsModel
        });
        this.#rerenderSortedList();
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
      case UpdateType.ERROR:
        this.#isError = true;
        remove(this.#loadingComponent);
        break;
    }
  };

  #rerenderSortedList() {
    const sortedPoints = this.eventPoints;
    this.#clearEventsList();
    sortedPoints.forEach((point) => this.#renderEventPoint(point));
  }

  #handleNewEventButtonClick = () => {
    if (this.#isCreatingNewPoint || this.#newEventButton.hasAttribute('disabled')) {
      return;
    }

    this.#isCreatingNewPoint = true;
    this.#newEventButton.setAttribute('disabled', '');

    this.#filterModel.setFilter(UpdateType.MAJOR, 'everything');
    this.#currentSortType = SortType.DAY;

    const newPoint = {
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
