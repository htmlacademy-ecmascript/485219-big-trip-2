import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class EventModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];

  #eventPointsApiService;

  constructor({eventPointsApiService}) {
    super();
    this.#eventPointsApiService = eventPointsApiService;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const [eventPoints, offers, destinations] = await Promise.all([
        this.#eventPointsApiService.eventPoints,
        this.#eventPointsApiService.offers,
        this.#eventPointsApiService.destinations,
      ]);

      this.#points = eventPoints.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch (error) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT, this.#points);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#eventPointsApiService.updatePoint(update);
      const updatedPoints = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoints,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoints);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  getOffersByType(type) {
    const offerType = this.#offers.find((offer) => offer.type === type);

    return offerType ? offerType.offers : [];
  }

  getSelectedOffers(type, ids) {
    const availableOffers = this.getOffersByType(type);

    if (!Array.isArray(ids)) {
      return [];
    }

    return availableOffers.filter((offer) => ids.includes(offer.id));
  }

  getDestinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }

  #adaptToClient(eventPoint) {
    const adaptedPoint = {
      ...eventPoint,
      basePrice: eventPoint['base_price'],
      dateFrom: eventPoint['date_from'] !== null ? new Date(eventPoint['date_from']) : eventPoint['date_from'],
      dateTo: eventPoint['date_to'] !== null ? new Date(eventPoint['date_to']) : eventPoint['date_to'],
      isFavorite: eventPoint['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
