import { template } from './template';

export const renderListView = (days, format) => {
  const daysContainer = document.querySelector(".days");

  const dayTemplate = template("#day-template");
  const eventTemplate = template("#event-template");
  const isFull = format === "full";

  // we take extra care to ensure we only render as many events as can fit in the vertical height!
  let heightBudget = daysContainer.getBoundingClientRect().height;
  let continueRender = true;

  days.forEach((day) => {
    if (!isFull && !continueRender) {
      return;
    }

    if (!isFull && day.events.length === 0) {
      return;
    }

    const dayEl = dayTemplate(day);
    if (isFull) {
      // stupid hack around the fact that templates have to contain a single root node
      daysContainer.appendChild(verticalDivider());
    }

    daysContainer.appendChild(dayEl);

    let numEventsRendered = 0;
    const eventsContainer = dayEl.querySelector(".events");

    // these are per-column in the full view, so reset them
    if (isFull) {
      continueRender = true;
      heightBudget = daysContainer.getBoundingClientRect().height;
    }

    day.events.forEach((event) => {
      if (!continueRender) {
        return;
      }

      const eventEl = eventTemplate(event);
      eventsContainer.appendChild(eventEl)
      const deficit = heightBudget - dayEl.getBoundingClientRect().height;

      if (deficit < 0) {
        continueRender = false;
        eventEl.remove();
        return;
      }

      numEventsRendered += 1;
    });

    if (!isFull && numEventsRendered === 0) {
      dayEl.remove();
    }

    heightBudget -= dayEl.getBoundingClientRect().height;
  });

  // stupid hack to render dividers between elements; the first is marked for removal
  const toDelete = document.querySelectorAll(".delete-first")[0];
  toDelete?.remove();
}

const verticalDivider = () => {
  const divider = document.createElement("div");
  divider.classList.add("divider--v");
  divider.classList.add("delete-first");
  return divider;
}
