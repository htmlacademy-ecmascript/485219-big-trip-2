import {render, RenderPosition} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventsEmptyView from '../view/trip-events-empty-view.js';
import TripEventPresenter from './trip-event-presenter';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();

export default class TripEventsList {
  #eventsModel;
  #listContainerElement;
  #eventsListPoints;
  #tripEventsData;
  #destinationsData;
  #offersData;

  constructor(eventsModel) {
    this.#eventsModel = eventsModel;
    this.#listContainerElement = tripEventsListElement;
  }

  init() {
    this.#eventsListPoints = [...this.#eventsModel.getPoints()];
    this.#tripEventsData = [...this.#eventsModel.points];
    this.#destinationsData = [...this.#eventsModel.destinations];
    this.#offersData = [...this.#eventsModel.offers];

    this.#renderEventsListPoints();
  }

  #renderEventsListPoints() {
    if (this.#tripEventsData.length === 0) {
      render(new EventsEmptyView(), tripEventsSectionElement);
      return;
    }

    render(tripEventsListElement, tripEventsSectionElement, RenderPosition.BEFOREEND);

    this.#eventsListPoints.forEach((point) => {
      const eventPresenter = new TripEventPresenter({
        listContainerElement: tripEventsListElement,
        point: point,
        selectedOffersData: [...this.#eventsModel.getSelectedOffers(point.type, point.offers)],
        offersData: [...this.#eventsModel.getOffersByType(point.type)],
        destinationsData: [...this.#eventsModel.destinations],
      });

      eventPresenter.init();
    });
  }
}
