import {render} from '../render';
import {remove, replace} from '../framework/render';
import EventsItemEditView from '../view/trip-events-item-edit-view';
import EventsItemView from '../view/trip-events-item-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripEventPresenter {
  #point;
  #selectedOffersData;
  #availableOffersData;
  #destination;
  #tripEventsListContainerElement;
  #eventsModel;

  #handleDataChange;
  #handleModeChange;

  #eventComponent = null;
  #eventEditFormComponent = null;

  #mode = Mode.DEFAULT;

  constructor({listContainerElement, onDataChange, onModeChange}) {
    this.#tripEventsListContainerElement = listContainerElement;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({point, selectedOffersData, availableOffersData, destination, eventsModel}) {
    this.#point = point;
    this.#selectedOffersData = selectedOffersData;
    this.#availableOffersData = availableOffersData;
    this.#destination = destination;
    this.#eventsModel = eventsModel;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditFormComponent = this.#eventEditFormComponent;

    this.#createEventPoint();

    if (!prevEventComponent || !prevEventEditFormComponent) {
      render(this.#eventComponent, this.#tripEventsListContainerElement.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditFormComponent, prevEventEditFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditFormComponent);
  }

  #createEventPoint() {
    this.#eventComponent = new EventsItemView({
      point: this.#point,
      offers: this.#availableOffersData,
      destination: this.#destination,
      onEditClick: () => {
        this.#replaceItemToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: () => {
        this.#handleFavoriteClick();
      }
    });

    this.#eventEditFormComponent = new EventsItemEditView({
      point: this.#point,
      selectedOffers: this.#selectedOffersData,
      availableOffers: this.#availableOffersData,
      destination: this.#destination,
      onFormSubmit: () => {
        this.#replaceFormToItem();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onEditClick: () => {
        this.#replaceFormToItem();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onChangeType: (newType) => {
        const updatedOffers = this.#eventsModel.getOffersByType(newType);

        this.#eventEditFormComponent.updateElement({
          type: newType,
          availableOffers: [...updatedOffers]
        });
      },
      onChangeDestination: (newDestination) => {
        const updatedDestination = this.#eventsModel.getDestinationByName(newDestination);

        this.#eventEditFormComponent.updateElement({
          destination: {
            ...updatedDestination
          }
        });
      }
    });
  }

  #handleFavoriteClick() {
    const updatedEvent = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };

    this.#handleDataChange(updatedEvent);
  }

  #replaceItemToForm() {
    replace(this.#eventEditFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem() {
    replace(this.#eventComponent, this.#eventEditFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditFormComponent.reset(this.#point, this.#destination, this.#availableOffersData);
      this.#replaceFormToItem();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditFormComponent);
  }
}
