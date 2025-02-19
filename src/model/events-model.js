import {mockDestinations} from '../mocks/mockDestinations.js';
import {mockOffers} from '../mocks/mockOffers.js';
import {getRandomPoint, mockPoints} from '../mocks/mockPoints.js';

export default class EventModel {
  points = Array.from({length: mockPoints.length}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getOfferByType(type) {
    return this.offers.find((offer) => offer.type === type);
  }

  findIdInType(type, id) {
    const offerType = this.getOfferByType(type);

    if (offerType) {
      return offerType.offers.find((offer) => offer.id === id);
    }
  }

  getDestination() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
