import {render, RenderPosition} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventsEmptyView from '../view/trip-events-empty-view.js';
import TripEventPresenter from './trip-event-presenter';
import {updateEvent} from '../utils';
import {SortType} from '../const';
import {sortEventByDate, sortEventByTime, sortEventByPrice} from '../eventPoint';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();

export default class TripEventsList {
  #eventsModel;
  #listContainerElement;
  #eventsListPoints;
  #tripEventsData;
  #currentSortType = SortType.DAY;

  #eventPresenters = new Map();

  constructor(eventsModel) {
    this.#eventsModel = eventsModel;
    this.#listContainerElement = tripEventsListElement;

    document.addEventListener('sortChanged', (evt) => this.#handleSortChange(evt));
  }

  init() {
    this.#eventsListPoints = [...this.#eventsModel.getPoints()];
    this.#tripEventsData = [...this.#eventsModel.points];

    this.#renderEventsListPoints();
  }

  #handleSortChange(evt) {
    const sortType = evt.detail.sortType;

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearEventsList();
    this.#renderEventsListPoints();
    this.#currentSortType = sortType;
  }

  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#tripEventsData.sort(sortEventByDate);
        break;
      case SortType.TIME:
        this.#tripEventsData.sort(sortEventByTime);
        break;
      case SortType.PRICE:
        this.#tripEventsData.sort(sortEventByPrice);
        break;
      default:
        break;
    }
  }

  #renderEventsListPoints() {
    if (this.#tripEventsData.length === 0) {
      render(new EventsEmptyView(), tripEventsSectionElement);
      return;
    }

    render(tripEventsListElement, tripEventsSectionElement, RenderPosition.BEFOREEND);

    this.#tripEventsData.forEach((point) => {
      this.#renderEventPoint(point);
    });
  }

  #renderEventPoint(point) {
    const eventPresenter = new TripEventPresenter({
      listContainerElement: tripEventsListElement,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModChange,
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

  #handleEventChange = (updatedEventPoint) => {
    this.#eventsModel.updatePoints(updateEvent(this.#eventsModel.points, updatedEventPoint));

    this.#eventPresenters.get(updatedEventPoint.id).init({
      point: updatedEventPoint,
      selectedOffersData: [...this.#eventsModel.getSelectedOffers(updatedEventPoint.type, updatedEventPoint.offers)],
      availableOffersData: [...this.#eventsModel.getOffersByType(updatedEventPoint.type)],
      destination: this.#eventsModel.getDestinationById(updatedEventPoint.destination),
    });
  };

  #handleModChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }
}
