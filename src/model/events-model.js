import {mockDestinations} from '../mocks/mockDestinations.js';
import {mockOffers} from '../mocks/mockOffers.js';
import {getRandomPoint, mockPoints} from '../mocks/mockPoints.js';
import Observable from '../framework/observable';

export default class EventModel extends Observable {
  #points = Array.from({length: mockPoints.length}, getRandomPoint);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
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
}
