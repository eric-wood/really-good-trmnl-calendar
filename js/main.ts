import { prepEvents, bucketEvents } from "@/events";
import { renderListView } from "@/list_view";
import { renderHourlyView } from "@/hourly_view";

export type Format = "full" | "half_horizontal" | "half_vertical" | "quadrant";

window.renderEvents = (format: Format) => {
  const numDays = Number(window.config.num_days) || 3;
  const events = prepEvents();
  const startDate = new Date();

  const layout = document.querySelector(".layout");
  layout.classList.add(format);
  if (window.config.single_column === "true") {
    layout.classList.add("single-column");
  }

  const days = bucketEvents(events, startDate, numDays);
  if (window.config.view_type === "list") {
    renderListView(days, format);
  } else {
    renderHourlyView(days, startDate, format);
  }
};
