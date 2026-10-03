import { prepEvents, bucketEvents } from './events';
import { renderListView } from './list_view';

window.renderEvents = (numDays, format) => {
  const events = prepEvents();
  const days = bucketEvents(events, new Date(), numDays);
  renderListView(days, format);
};

