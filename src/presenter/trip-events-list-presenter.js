import {render, RenderPosition} from '../render.js';
import {replace} from '../framework/render';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventsItemEditView from '../view/trip-events-item-edit-view.js';
import EventsItemView from '../view/trip-events-item-view.js';
import EventsEmptyView from '../view/trip-events-empty-view.js';

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

    for (let i = 0; i < this.#eventsListPoints.length; i++) {
      this.#renderEventPoint(this.#eventsListPoints[i], this.#offersData, this.#destinationsData);
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
      destination: this.#eventsModel.getDestinationById(point.destination),
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
