import type { Day } from "@/events";
import { Format } from "@/main";
import { deleteFirstHack, verticalDivider } from "@/util";
import { DayComponent } from "./components/list/day";

export const renderListView = (days: Day[], format: Format) => {
  const daysContainer = document.querySelector(".days") as HTMLElement;

  if (!daysContainer) {
    console.error("Unable to locate days container");
    return;
  }

  const columns = format === "full" && window.config.single_column !== "true";

  // we take extra care to ensure we only render as many events as can fit in the vertical height!
  const maxBottom = daysContainer.getBoundingClientRect().bottom;

  for (const day of days) {
    if (!columns && day.events.length === 0) {
      continue;
    }

    if (columns) {
      // stupid hack around the fact that templates have to contain a single root node
      daysContainer.appendChild(verticalDivider());
    }

    const dayComponent = new DayComponent({
      day,
      maxBottom,
      removeIfEmpty: !columns,
    });
    dayComponent.render(daysContainer);

    if (!columns && dayComponent.exhausted) {
      break;
    }
  }

  deleteFirstHack();
};
