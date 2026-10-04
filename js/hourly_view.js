import { template } from './template';
import { minMaxHour } from './events';
import { deleteFirstHack, verticalDivider, hideStuff } from './util';

const backgrounds = [10, 30, 60];

export const renderHourlyView = (days, startDate, format) => {
  const daysContainer = document.querySelector(".days");

  const dayTemplate = template("#day-template");
  const eventTemplate = template("#hourly-event");
  const isFull = format === "full";

  const allEvents = days.flatMap(({ events }) => events);
  const numCalendars = new Set(allEvents.map(({ calendarIndex }) => calendarIndex)).size;
  const weekWindow = minMaxHour(allEvents);

  // TODO: logic to handle when this duration is tiny; maybe set a min day size?
  const numHours = weekWindow.numHours;
  const startTime = weekWindow.min;
  const endTime = weekWindow.max;

  const dayEls = days.map((day, i) => {
    startTime.setDate(startDate.getDate() + i);
    endTime.setDate(startDate.getDate() + i);

    const dayEl = dayTemplate(day);

    if (isFull) {
      // stupid hack around the fact that templates have to contain a single root node
      daysContainer.appendChild(verticalDivider());
    }

    daysContainer.appendChild(dayEl);
    const eventsContainer = dayEl.querySelector('.events');
    const eventDimensions = eventsContainer.getBoundingClientRect();
    const startPx = eventDimensions.top;
    const height = eventDimensions.height;

    day.events.forEach((event) => {
      if (event.allDay || !(event.start < endTime && event.end > startTime)) {
        return;
      }

      const offset = height / (endTime - startTime);
      const top = (event.start - startTime) * offset;
      const bottom = height - (event.end - startTime) * offset;
      const eventEl = eventTemplate({
        top,
        bottom,
        name: event.name,
        durationString: event.durationString,
      });

      if (numCalendars > 1) {
        eventEl.querySelector(".stripe").classList.add(`bg--gray-${backgrounds[event.calendarIndex]}`);
      }
      eventsContainer.appendChild(eventEl)
    });

    return dayEl;
  });

  hideStuff("hourly");

  const dayDimensions = dayEls[0].getBoundingClientRect();
  const eventDimensions = dayEls[0].querySelector('.events').getBoundingClientRect();

  const startPx = eventDimensions.top - dayDimensions.top;
  const height = eventDimensions.height;
  const pxPerHour = height / numHours;

  let maxLabelWidth = 0;
  for (let i = 0; i < numHours; i += 1) {
    const hour = startTime.getHours();
    startTime.setHours(startTime.getHours() + 1);
    const y = i * pxPerHour + startPx;
    const divider = hourDivider(y, hour);
    daysContainer.appendChild(divider);

    const label = divider.querySelector(".label");
    const labelWidth = label.getBoundingClientRect().width;
    if (labelWidth > maxLabelWidth) {
      maxLabelWidth = labelWidth;
    }
  }

  // make all labels the same width
  document.querySelectorAll('.hour-marker .label').forEach((label) => {
    label.style.width = `${maxLabelWidth}px`;
  });

  dayEls[0].style.paddingLeft = `${maxLabelWidth + 10}px`;

  deleteFirstHack();
}

const hourDivider = (y, hour) => {
  const compiled = template("#hour-marker-template");
  const el = compiled({ y, hour });
  return el
}
