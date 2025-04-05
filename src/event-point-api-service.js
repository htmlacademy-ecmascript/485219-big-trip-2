import ApiService from './framework/api-service.js';
import {convertDateToISO} from './utils';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class EventPointApiService extends ApiService {
  get eventPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(eventPoint) {
    const response = await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(eventPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  #adaptToServer(eventPoint) {
    const adaptedPoint = {
      ...eventPoint,
      'base_price': eventPoint.basePrice,
      'date_from': convertDateToISO(eventPoint.dateFrom),
      'date_to': convertDateToISO(eventPoint.dateTo),
      'is_favorite': eventPoint.isFavorite,
      'offers': eventPoint.availableOffers,
      'type': eventPoint.type
    };

    if (eventPoint.id === null) {
      delete adaptedPoint.id;
    }

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.availableOffers;

    return adaptedPoint;
  }
}
