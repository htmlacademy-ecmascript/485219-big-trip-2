import {render} from './render.js';
import RenderFilterEverythingView from './view/filter-everything-view.js';

const pageHeaderElement = document.querySelector('.page-header');
const filterControlsContainerElement = pageHeaderElement.querySelector('.trip-controls__filters');

render(new RenderFilterEverythingView(), filterControlsContainerElement);


