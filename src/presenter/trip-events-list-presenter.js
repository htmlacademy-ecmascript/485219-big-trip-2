import {render, RenderPosition} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventsItemEditView from '../view/trip-events-item-edit-view.js';
import EventsItemView from '../view/trip-events-item-view.js';

// const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();
const renderCount = 3;

export default class TripEventsList {
  #eventsModel;
  #listContainer;
  #eventsListPoints;

  // constructor(listContainer) {
  //   this.#listContainer = tripEventsListElement;
  // }

  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
  }

  init() {
    this.#eventsListPoints = [...this.#eventsModel.getPoints()];
    this.#renderEventsListPoints();

    // render(tripEventsListElement, this.#listContainer, RenderPosition.BEFOREEND);

    // render(new EventsItemEditView({
    //   point: this.eventsListPoints[0],
    //   selectedOffers: [...this.eventsModel.getSelectedOffers(this.eventsListPoints[0].type, this.eventsListPoints[0].offers)],
    //   availableOffers: [...this.eventsModel.getOffersByType(this.eventsListPoints[0].type)]
    // }), tripEventsListElement.element);

    // for (let i = 0; i < renderCount; i++) {
    //   render(new EventsItemView({
    //     point: this.eventsListPoints[i],
    //     offers: [...this.#eventsModel.getSelectedOffers(this.eventsListPoints[i].type, this.eventsListPoints[i].offers)],
    //     destination: this.#eventsModel.getDestinationById(this.eventsListPoints[i].destination),
    //   }), tripEventsListElement.element);
    // }
  }

  #renderEventsListPoints() {
    render(tripEventsListElement, this.#listContainer, RenderPosition.BEFOREEND);
    this.eventsListPoints.forEach((tripEvent) => {
      this.#renderTripEvent();
    })
  }

  #renderTripEvent(tripEvent) {
    const offers = "";
    const destination = "";
    const offerType = "";
    const destinationsAll = "";
  }

}
