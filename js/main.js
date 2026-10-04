import { prepEvents, bucketEvents } from './events';
import { renderListView } from './list_view';
import { renderHourlyView } from './hourly_view';

window.renderEvents = (numDays, format) => {
  const events = prepEvents();
  const startDate = new Date();
  const days = bucketEvents(events, startDate, numDays);
  if (config.view_type === "list") {
    renderListView(days, format);
  } else {
    renderHourlyView(days, startDate, format);
  }
};

