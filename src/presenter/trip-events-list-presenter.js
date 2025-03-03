import {render, RenderPosition} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventsItemEditView from '../view/trip-events-item-edit-view.js';
import EventsItemView from '../view/trip-events-item-view.js';
import {replace} from '../framework/render';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();

export default class TripEventsList {
  #eventsModel;
  #listContainer;
  #eventsListPoints;
  #tripEvents;
  #destinations;
  #offers;

  constructor(eventsModel) {
    this.#eventsModel = eventsModel;
    this.#listContainer = tripEventsListElement;
  }

  init() {
    this.#eventsListPoints = [...this.#eventsModel.getPoints()];
    this.#tripEvents = [...this.#eventsModel.points];
    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];
    this.#renderEventsListPoints();
  }

  #renderEventsListPoints() {
    render(tripEventsListElement, tripEventsSectionElement, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#eventsListPoints.length; i++) {
      this.#renderEventPoint(this.#eventsListPoints[i], this.#offers, this.#destinations);
    }
  }

  #renderEventPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventsItemView({
      point,
      offers: [...this.#eventsModel.getSelectedOffers(point.type, point.offers)],
      destination: this.#eventsModel.getDestinationById(point.destination),
      onEditClick: () => {
        replaceItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditFormComponent = new EventsItemEditView({
      point,
      selectedOffers: [...this.#eventsModel.getSelectedOffers(point.type, point.offers)],
      availableOffers: [...this.#eventsModel.getOffersByType(point.type)],
      onFormSubmit: () => {
        replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceItemToForm() {
      replace(eventEditFormComponent, eventComponent);
    }

    function replaceFormToItem() {
      replace(eventComponent, eventEditFormComponent);
    }

    render(eventComponent, tripEventsListElement.element);
  }
}
