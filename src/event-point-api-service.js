import ApiService from './framework/api-service.js';
import {convertDateToISO} from './utils';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
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
    const adapted = this.#adaptToServer(eventPoint);


    const response = await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(adapted),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  async addEventPoint(eventPoint) {
    const adapted = this.#adaptToServer(eventPoint);


    try {
      const response = await this._load({
        url: 'points',
        method: Method.POST,
        body: JSON.stringify(adapted),
        headers: new Headers({'Content-Type': 'application/json'}),
      });
      return await ApiService.parseResponse(response);
    } catch (error) {
      throw new Error(`Failed to add point: ${error.message}`);
    }
  }


  async deleteEventPoint(eventPoint) {
    return await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.DELETE,
    });
  }

  #adaptToServer(eventPoint) {
    const adaptedPoint = {
      ...eventPoint,
      'base_price': eventPoint.basePrice,
      'date_from': convertDateToISO(eventPoint.dateFrom),
      'date_to': convertDateToISO(eventPoint.dateTo),
      'is_favorite': eventPoint.isFavorite,
      'offers': eventPoint.offers,
      'type': eventPoint.type
    };

    delete adaptedPoint.id;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.availableOffers;

    console.log(adaptedPoint);

    return adaptedPoint;
  }

}
