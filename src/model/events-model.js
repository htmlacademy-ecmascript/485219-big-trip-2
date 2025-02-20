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

  getOffersByType(type) {
    const offerType = this.offers.find((offer) => offer.type === type);

    return offerType ? offerType.offers : [];
  }

  getSelectedOffers(type, ids) {
    const availableOffers = this.getOffersByType(type);
    const selectedOffers = ids;

    const matchingOffers = selectedOffers.filter((offer) => availableOffers.some((available) => available.id === offer));
    console.log(matchingOffers);
    return matchingOffers;
  }

  getDestination() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
