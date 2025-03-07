import {render} from '../render';
import {replace} from '../framework/render';
import EventsItemEditView from '../view/trip-events-item-edit-view.js';
import EventsItemView from '../view/trip-events-item-view.js';

export default class TripEventPresenter {
  #point;
  #selectedOffersData;
  #availableOffersData;
  #destinationsData;
  #tripEventsListContainerElement;

  #eventComponent;
  #eventEditFormComponent;

  constructor({ listContainerElement, point, selectedOffersData, offersData, destinationsData }) {
    this.#point = point;
    this.#selectedOffersData = selectedOffersData;
    this.#availableOffersData = offersData;
    this.#destinationsData = destinationsData;
    this.#tripEventsListContainerElement = listContainerElement;
  }

  init() {
    this.#renderEventPoint();
  }

  #renderEventPoint() {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#eventComponent = new EventsItemView({
      point: this.#point,
      offers: this.#availableOffersData,
      destination: this.#destinationsData,
      onEditClick: () => {
        this.#replaceItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    this.#eventEditFormComponent = new EventsItemEditView({
      point: this.#point,
      selectedOffers: this.#selectedOffersData,
      availableOffers: this.#availableOffersData,
      destination: this.#destinationsData,
      onFormSubmit: () => {
        this.#replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        this.#replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    render(this.#eventComponent, this.#tripEventsListContainerElement.element);
  }

  #replaceItemToForm() {
    replace(this.#eventEditFormComponent, this.#eventComponent);
  }

  #replaceFormToItem() {
    replace(this.#eventComponent, this.#eventEditFormComponent);
  }
}
