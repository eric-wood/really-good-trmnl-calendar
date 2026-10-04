import { template } from './template';
import { deleteFirstHack, verticalDivider, hideStuff } from './util';

export const renderHourlyView = (days, format) => {
  const daysContainer = document.querySelector(".days");

  const dayTemplate = template("#day-template");
  const eventTemplate = template("#event-template");
  const isFull = format === "full";

  const numHours = 12; // TODO: make configurable
  const startTime = new Date();
  startTime.setMinutes(0);
  startTime.setSeconds(0);
  startTime.setMilliseconds(0);

  const dayEls = days.map((day) => {
    const dayEl = dayTemplate(day);

    if (isFull) {
      // stupid hack around the fact that templates have to contain a single root node
      daysContainer.appendChild(verticalDivider());
    }

    daysContainer.appendChild(dayEl);
    return dayEl;
  });

  const eventDimensions = dayEls[0].querySelector('.events').getBoundingClientRect();
  const startPx = eventDimensions.top;
  const height = eventDimensions.height;
  const pxPerHour = height / numHours;

  for (let i = 0; i < numHours; i += 1) {
    const hour = startTime.getHours();
    startTime.setHours(startTime.getHours() + 1);
    const y = i * pxPerHour + startPx;
    daysContainer.appendChild(hourDivider(y, hour));
  }

  deleteFirstHack();
  hideStuff("hourly");
}

const hourDivider = (y, hour) => {
  const compiled = template("#hour-marker-template");
  const el = compiled({ y, hour });
  console.log(el)
  return el
}
