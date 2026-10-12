import { minMaxHour } from "@/events";
import { deleteFirstHack, verticalDivider } from "@/util";
import type { Format } from "@/main";
import type { Day } from "@/events";
import { DayComponent } from "@/components/hourly/day";
import { MarkerComponent } from "@/components/hourly/marker";

export const renderHourlyView = (
  days: Day[],
  startDate: Date,
  format: Format,
) => {
  const daysContainer = document.querySelector(".days") as HTMLElement;

  const isFull = format === "full";

  const allEvents = days.flatMap(({ events }) => events);
  const numCalendars = new Set(
    allEvents.map(({ calendarIndex }) => calendarIndex),
  ).size;
  const weekWindow = minMaxHour(allEvents);

  // TODO: logic to handle when this duration is tiny; maybe set a min day size?
  const numHours = weekWindow.numHours;
  const startTime = weekWindow.min;
  const endTime = weekWindow.max;

  const dayComponents = days.map((day, i) => {
    startTime.setDate(startDate.getDate() + i);
    endTime.setDate(startDate.getDate() + i);

    if (isFull) {
      // stupid hack around the fact that templates have to contain a single root node
      daysContainer.appendChild(verticalDivider());
    }

    const dayComponent = new DayComponent({
      day,
      startTime,
      endTime,
      numCalendars,
    });

    dayComponent.render(daysContainer);
    return dayComponent;
  });

  const firstDayEl = daysContainer.querySelector(".day") as HTMLElement;

  drawLabels({ firstDayEl, numHours, startTime, daysContainer });

  deleteFirstHack();

  dayComponents.forEach((day) => {
    day.fitEvents();
  });
};

const drawLabels = ({
  firstDayEl,
  numHours,
  startTime,
  daysContainer,
}: {
  firstDayEl: HTMLElement;
  numHours: number;
  startTime: Date;
  daysContainer: HTMLElement;
}) => {
  const dayDimensions = firstDayEl.getBoundingClientRect();
  const eventsContainer = firstDayEl.querySelector(".events");

  if (!eventsContainer) {
    console.error("unable to locate .events in day");
    return;
  }

  const eventDimensions = eventsContainer.getBoundingClientRect();

  const startPx = eventDimensions.top - dayDimensions.top;
  const height = eventDimensions.height;
  const pxPerHour = height / numHours;

  let maxLabelWidth = 0;
  for (let i = 0; i < numHours; i += 1) {
    const hour = startTime.getHours();
    startTime.setHours(startTime.getHours() + 1);
    const y = i * pxPerHour + startPx;
    const marker = new MarkerComponent({ y, hour });
    const divider = marker.render(daysContainer);

    const label = divider.querySelector(".label");
    const labelWidth = label.getBoundingClientRect().width;
    if (labelWidth > maxLabelWidth) {
      maxLabelWidth = labelWidth;
    }
  }

  // make all labels the same width
  document.querySelectorAll(".hour-marker .label").forEach((label) => {
    if (!(label instanceof HTMLElement)) {
      return;
    }

    label.style.width = `${maxLabelWidth}px`;
  });

  firstDayEl.style.paddingLeft = `${maxLabelWidth + 10}px`;
};
