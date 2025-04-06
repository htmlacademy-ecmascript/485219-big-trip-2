import {remove, replace} from '../framework/render';
import EventsItemEditView from '../view/trip-events-item-edit-view';
import EventsItemView from '../view/trip-events-item-view';
import {UpdateType, UserAction} from '../const';
import {isDatesEqual} from '../event-point';
import {render, RenderPosition} from '../render';

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
  #isNewPoint;

  constructor({listContainerElement, onDataChange, onModeChange, isNewPoint = false}) {
    this.#tripEventsListContainerElement = listContainerElement;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#isNewPoint = isNewPoint;
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
      if (this.#isNewPoint) {
        this.#replaceItemToForm();
      } else {
        render(this.#eventComponent, this.#tripEventsListContainerElement.element);
      }
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditFormComponent, prevEventEditFormComponent);
    }

    if (this.#mode === Mode.EDITING && !this.#isNewPoint) {
      this.#replaceFormToItem();
    }

    remove(prevEventComponent);
    remove(prevEventEditFormComponent);
  }

  #createEventPoint() {
    this.#eventComponent = new EventsItemView({
      point: this.#point,
      offers: this.#selectedOffersData,
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
      destinations: this.#eventsModel.getDestinations(),
      onFormSubmit: (eventPoint) => {
        this.#handleFormSubmit(eventPoint);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onEditClick: () => {
        this.#eventEditFormComponent.reset(this.#point, this.#destination, this.#availableOffersData);
        this.#replaceFormToItem();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onChangeType: (newType) => {
        const updatedOffers = this.#eventsModel.getOffersByType(newType);
        this.#point.offers = [];
        this.#eventEditFormComponent.updateElement({
          type: newType,
          offers: [],
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
      },
      onDeleteClick: (eventPoint) => {
        this.#handleDeleteClick(eventPoint);
      }
    });
  }

  #setButtonsDisabled(isDisabled) {
    if (this.#eventComponent) {
      const rollupButton = this.#eventEditFormComponent.element.querySelector('.event__rollup-btn');
      if (rollupButton) {
        rollupButton.disabled = isDisabled;
      }

      const saveButton = this.#eventEditFormComponent.element.querySelector('.event__save-btn');
      if (saveButton) {
        saveButton.disabled = isDisabled;
      }

      const deleteButton = this.#eventEditFormComponent.element.querySelector('.event__reset-btn');
      if (deleteButton) {
        deleteButton.disabled = isDisabled;
      }
    }
  }

  #handleFormSubmit = (eventPoint) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, eventPoint.dateFrom);

    this.#setButtonsDisabled(true);

    this.#handleDataChange(
      this.#isNewPoint ? UserAction.ADD_POINT : UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      eventPoint,
    );

    if (this.#isNewPoint) {
      this.#isNewPoint = false;
    }
  };

  #handleFavoriteClick() {
    const updatedEvent = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      updatedEvent
    );
  }

  #handleDeleteClick = (eventPoint) => {
    this.#setButtonsDisabled(true);

    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      eventPoint
    );
  };

  #replaceItemToForm() {
    if (this.#isNewPoint) {
      render(this.#eventEditFormComponent, this.#tripEventsListContainerElement.element, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#eventEditFormComponent, this.#eventComponent);
    }
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem() {
    if (this.#isNewPoint) {
      remove(this.#eventEditFormComponent);
      this.destroy();
    } else {
      this.#eventEditFormComponent.reset(this.#point, this.#destination, this.#availableOffersData);
      replace(this.#eventComponent, this.#eventEditFormComponent);
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
      this.#setButtonsDisabled(true);
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
      this.#setButtonsDisabled(true);
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditFormComponent.shake(resetFormState);
  }

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
