import TripInfoView from '../view/trip-info-view.js';
import {render, remove} from '../framework/render.js';
import {RenderPosition} from '../render';
import {sortEventByDate} from '../event-point';
import {humanizeTaskDueDate} from '../utils';

export default class TripInfoPresenter {
  #container;
  #eventsModel;
  #offersModel;
  #tripInfoComponent;

  constructor({container, eventsModel, offersModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#tripInfoComponent = null;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderTripInfo();
  }

  #formatDate(dateString) {
    return humanizeTaskDueDate(dateString, 'D MMM');
  }

  #calculateOffersPrice(point) {
    if (!point || !point.offers || !Array.isArray(point.offers)) {
      return 0;
    }

    return point.offers.reduce((total, offerId) => total + (this.#eventsModel.getOfferPriceById(offerId) || 0), 0);
  }


  #calculateTotalPrice(points) {
    if (!points) {
      return 0;
    }

    return points.reduce((total, point) => total + point.basePrice + this.#calculateOffersPrice(point), 0);
  }

  #getSortedPoints(points) {
    if (!points || points.length === 0) {
      return [];
    } else {
      return [...points].sort(sortEventByDate);
    }
  }

  #getTripDates(sortedPoints) {
    if (!sortedPoints || sortedPoints.length === 0) {
      return '';
    }

    const endDate = this.#formatDate(sortedPoints[0].dateFrom);
    const startDate = this.#formatDate(sortedPoints[sortedPoints.length - 1].dateTo);

    return `${startDate} — ${endDate}`;
  }

  #getTripTitle(sortedPoints) {
    if (!sortedPoints || sortedPoints.length === 0) {
      return '... - ...';
    }

    const startPoint = this.#eventsModel.getDestinationById(sortedPoints[0].destination).name;
    const middlePoint = this.#eventsModel.getDestinationById(sortedPoints[1].destination).name;
    const endPoint = this.#eventsModel.getDestinationById(sortedPoints[sortedPoints.length - 1].destination).name;

    return sortedPoints.length <= 3 ? `${startPoint} - ${middlePoint} - ${endPoint}` : `${startPoint} — ... — ${endPoint}`;
  }

  #renderTripInfo() {
    const points = this.#eventsModel.points || [];
    const sortedPoints = this.#getSortedPoints(points);

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (sortedPoints.length === 0) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      title: this.#getTripTitle(sortedPoints),
      dates: this.#getTripDates(sortedPoints),
      totalPrice: this.#calculateTotalPrice(points)
    });

    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.#renderTripInfo();
  };
}
