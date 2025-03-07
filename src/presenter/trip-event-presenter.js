import {render} from '../render';
import {remove, replace} from '../framework/render';
import EventsItemEditView from '../view/trip-events-item-edit-view.js';
import EventsItemView from '../view/trip-events-item-view.js';

export default class TripEventPresenter {
  #point;
  #selectedOffersData;
  #availableOffersData;
  #destination;
  #tripEventsListContainerElement;

  #eventComponent = null;
  #eventEditFormComponent = null;

  constructor({listContainerElement}) {
    this.#tripEventsListContainerElement = listContainerElement;
  }

  init({point, selectedOffersData, availableOffersData, destination}) {
    this.#point = point;
    this.#selectedOffersData = selectedOffersData;
    this.#availableOffersData = availableOffersData;
    this.#destination = destination;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditFormComponent = this.#eventEditFormComponent;

    this.#createEventPoint();

    if (prevEventComponent === null || prevEventEditFormComponent === null) {
      render(this.#eventComponent, this.#tripEventsListContainerElement.element);
      return;
    }

    if (this.#tripEventsListContainerElement.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#tripEventsListContainerElement.contains(prevEventEditFormComponent)) {
      replace(this.#eventEditFormComponent, prevEventEditFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditFormComponent);
  }

  #createEventPoint() {
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
      destination: this.#destination,
      onEditClick: () => {
        this.#replaceItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    this.#eventEditFormComponent = new EventsItemEditView({
      point: this.#point,
      selectedOffers: this.#selectedOffersData,
      availableOffers: this.#availableOffersData,
      destination: this.#destination,
      onFormSubmit: () => {
        this.#replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        this.#replaceFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });
  }

  #replaceItemToForm() {
    replace(this.#eventEditFormComponent, this.#eventComponent);
  }

  #replaceFormToItem() {
    replace(this.#eventComponent, this.#eventEditFormComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditFormComponent);
  }
}
