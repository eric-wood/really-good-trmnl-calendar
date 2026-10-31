import { prepEvents, bucketEvents } from "@/events";
import { HourlyComponent } from "@/components/hourly/hourly";
import type { Day } from "@/events";
import { ListComponent } from "./components/list/list";
import { querySelector } from "./util";

export type Format = "full" | "half_horizontal" | "half_vertical" | "quadrant";

window.renderEvents = (format: Format) => {
  const numDays = Number(window.config.num_days) || 3;
  const events = prepEvents();
  const startDate = new Date();

  const layout = querySelector(".layout");
  layout.classList.add(format);
  if (window.config.single_column === "true") {
    layout.classList.add("single-column");
  }

  if (window.config.show_title_bar === "false") {
    const titleBar = querySelector(".title_bar");
    titleBar.style.display = "none";
  }

  const days = bucketEvents(events, startDate, numDays);
  if (window.config.view_type === "list") {
    renderListView(days, format);
  } else {
    renderHourlyView(days, startDate, format);
  }
};

const renderListView = (days: Day[], format: Format) => {
  const container = querySelector(".layout");
  const component = new ListComponent({ days, format });
  component.render(container);
};

const renderHourlyView = (days: Day[], startDate: Date, format: Format) => {
  const container = querySelector(".layout");
  const hourlyComponent = new HourlyComponent({ days, format, startDate });
  hourlyComponent.render(container);
};
