import { prepEvents, bucketEvents } from "@/events";
import { renderListView } from "@/list_view";
import { renderHourlyView } from "@/hourly_view";

export type Format = "full" | "half_horizontal" | "half_vertical" | "quadrant";

window.renderEvents = (numDays: number, format: Format) => {
  const events = prepEvents();
  const startDate = new Date();

  document.querySelector(".layout").classList.add(format);
  const days = bucketEvents(events, startDate, numDays);
  if (window.config.view_type === "list") {
    renderListView(days, format);
  } else {
    renderHourlyView(days, startDate, format);
  }
};
