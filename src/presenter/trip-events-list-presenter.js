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

  constructor(eventsModel) {
    this.#eventsModel = eventsModel;
    this.#listContainerElement = tripEventsListElement;
  }

  init() {
    this.#eventsListPoints = [...this.#eventsModel.getPoints()];
    this.#tripEventsData = [...this.#eventsModel.points];

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
      });

      eventPresenter.init({
        point: point,
        selectedOffersData: [...this.#eventsModel.getSelectedOffers(point.type, point.offers)],
        availableOffersData: [...this.#eventsModel.getOffersByType(point.type)],
        destination: this.#eventsModel.getDestinationById(point.destination),
      });
    });
  }
}
