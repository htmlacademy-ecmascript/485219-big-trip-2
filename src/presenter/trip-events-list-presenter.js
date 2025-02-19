import {render, RenderPosition} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventsItemEditView from '../view/trip-events-item-edit-view.js';
import EventsItemView from '../view/trip-events-item-view.js';

const tripEventsSectionElement = document.querySelector('.trip-events');
const tripEventsListElement = new TripEventsListView();
const renderCount = 3;

export default class TripEventsList {

  constructor(eventsModel) {
    this.eventsModel = eventsModel;
  }

  init() {
    this.eventsListPoints = [...this.eventsModel.getPoints()];

    render(tripEventsListElement, tripEventsSectionElement, RenderPosition.BEFOREEND);
    render(new EventsItemEditView(), tripEventsListElement.getElement());
    for (let i = 0; i < renderCount; i++) {
      render(new EventsItemView(), tripEventsListElement.getElement());
    }
  }
}
