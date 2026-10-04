import { prepEvents, bucketEvents } from './events';
import { renderListView } from './list_view';
import { renderHourlyView } from './hourly_view';

window.renderEvents = (numDays, format) => {
  const events = prepEvents();
  const days = bucketEvents(events, new Date(), numDays);
  if (config.view_type === "list") {
    renderListView(days, format);
  } else {
    renderHourlyView(days, format);
  }
};

