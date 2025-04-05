import {DATE_TIME_FORMAT, UpdateType, UserAction} from '../const';
import {humanizeTaskDueDate} from '../utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEventOfferSelectorTemplate(availableOffers, selectedOffers) {
  const isChecked = selectedOffers.some((selected) => selected === availableOffers.id);

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${availableOffers.id}" type="checkbox" name="event-offer-luggage" ${isChecked ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-luggage-${availableOffers.id}">
                <span class="event__offer-title">${availableOffers.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${availableOffers.price}</span>
              </label>
            </div>`;
}

function createDestinationPictures(pictures) {
  return `<img class="event__photo" src=${pictures.src} alt="Event photo">`;
}

function createEventsItemEditViewTemplate(point, selectedOffers, availableOffers, destination, destinations, isDisabled, isSaving, isDeleting) {
  const {basePrice, dateFrom, dateTo, type} = point;
  const {name, description, pictures} = destination;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post" ${isDisabled ? 'disabled' : ''}>
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                        ${destinations.map((destinationPoint) => `<option value="${destinationPoint.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, DATE_TIME_FORMAT)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, DATE_TIME_FORMAT)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
                    ${isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
                    ${isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                  <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${availableOffers.map((offer) => createEventOfferSelectorTemplate(offer, selectedOffers)).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${pictures.map((picture) => createDestinationPictures(picture)).join('')}
                      </div>
                    </div>

                  </section>
                </section>
              </form>
            </li>`;
}

export default class EventsItemEditView extends AbstractStatefulView {
  #point;
  #selectedOffers;
  #availableOffers;
  #destination;
  #destinations;
  #handleSubmitClick;
  #handleEditClick;
  #handleChangeType;
  #handleChangeDestination;
  #datepickerFrom;
  #datepickerTo;

  #handleDeleteClick;

  #isNewPoint;

  constructor(
    {
      point,
      selectedOffers,
      availableOffers,
      destination,
      destinations,
      onFormSubmit,
      onEditClick,
      onChangeType,
      onChangeDestination,
      onDeleteClick,
      isNewPoint = false
    }) {
    super();
    this.#point = point;
    this.#selectedOffers = selectedOffers;
    this.#availableOffers = availableOffers;
    this.#destination = destination;
    this.#destinations = destinations;
    this.#handleSubmitClick = onFormSubmit;
    this.#handleEditClick = onEditClick;
    this.#handleChangeType = onChangeType;
    this.#handleChangeDestination = onChangeDestination;

    this.#handleDeleteClick = onDeleteClick;

    this._setState(EventsItemEditView.parsePointToState(this.#point, this.#destination, this.#availableOffers));
    this._restoreHandlers();

    this.#isNewPoint = isNewPoint;

    if (this.#isNewPoint) {
      this.#handleEditClick = () => {
        onEditClick();
        this.#handleFormClose();
      };
    }
  }

  get template() {
    return createEventsItemEditViewTemplate(
      this._state,
      this._state.offers,
      this._state.availableOffers,
      this._state.destination,
      this.#destinations,
      this._state.isDisabled,
      this._state.isSaving,
      this._state.isDeleting,
    );
  }

  reset(eventPoint, destination, availableOffers) {
    this.updateElement(EventsItemEditView.parsePointToState(eventPoint, destination, availableOffers));
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #submitClickHandler = (evt) => {
    evt.preventDefault();

    const priceInput = this.element.querySelector('.event__input--price');
    const priceValue = Number(priceInput.value);

    if (isNaN(priceValue)) {
      priceInput.setCustomValidity('Цена должна быть числом');
      priceInput.reportValidity();
      return;
    }

    if (priceValue <= 0) {
      priceInput.setCustomValidity('Цена должна быть больше 0');
      priceInput.reportValidity();
      return;
    }

    priceInput.setCustomValidity('');
    this.#handleSubmitClick(EventsItemEditView.parseStateToPoint(this._state));
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOffersHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickers();

    if (this.#isNewPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleFormClose);
    }

    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
  }

  #changeTypeHandler = (evt) => {
    if (evt.target.closest('input')) {
      const newType = evt.target.value;
      this.#handleChangeType(newType);

      this.updateElement({
        destination: this.#destinations[0]
      });
    }
  };

  #changeDestinationHandler = (evt) => {
    const selectedDestinationName = evt.target.value;

    const isValidDestination = this.#destinations.some(
      (dest) => dest.name === selectedDestinationName
    );

    if (!isValidDestination) {
      evt.target.setCustomValidity('Выберите пункт назначения из списка');
      evt.target.reportValidity();
      return;
    }

    evt.target.setCustomValidity('');
    this.#handleChangeDestination(selectedDestinationName);
  };

  #priceInputHandler = (evt) => {
    const priceInput = evt.target;

    const newValue = priceInput.value.replace(/[^0-9]/g, '');

    if (priceInput.value !== newValue) {
      priceInput.value = newValue;
    }

    this._state.basePrice = newValue ? Number(newValue) : 0;
  };

  #changeOffersHandler = (evt) => {
    if (evt.target.closest('input') && evt.target.type === 'checkbox') {
      const offerId = evt.target.id.split('event-offer-luggage-')[1];
      let updatedSelectedOffers;

      if (evt.target.checked) {
        updatedSelectedOffers = [...this._state.offers, offerId];
      } else {
        updatedSelectedOffers = this._state.offers.filter((id) => id !== offerId);
      }

      this.updateElement({
        offers: updatedSelectedOffers
      });
    }
  };

  #setDatepickers() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: ([userDate]) => this.#dateFromCloseHandler(userDate),
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: ([userDate]) => this.#dateToCloseHandler(userDate),
        minDate: this._state.dateFrom
      }
    );
  }

  #dateFromCloseHandler(userDate) {
    this.updateElement({
      dateFrom: userDate
    });
  }

  #dateToCloseHandler(userDate) {
    this.updateElement({
      dateTo: userDate
    });
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventsItemEditView.parseStateToPoint(this._state));
  };


  #handleFormClose = () => {
    if (this.#isNewPoint) {
      this.#handleDeleteClick(UserAction.DELETE_POINT, UpdateType.MINOR, this._state);
    }
    this.#handleEditClick();
  };

  static parsePointToState(point, destination, availableOffers) {
    return {
      ...point,
      destination: {
        ...destination
      },
      availableOffers: [...availableOffers],
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {
      ...state,
      destination: state.destination.id,
      offers: [...state.offers]
    };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
