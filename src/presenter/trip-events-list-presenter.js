import {render, RenderPosition} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();

export default class TripEventsList {
  init() {
    render(tripEventsListElement, tripEventsSectionElement, RenderPosition.BEFOREEND);
  }
}
