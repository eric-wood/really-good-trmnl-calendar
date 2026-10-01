import { template } from './template';
import { prepEvents, bucketEvents } from './events';

console.clear() // TODO: remove :)

window.renderEvents = (numDays) => {
  const events = prepEvents();
  const days = bucketEvents(events, new Date(), numDays);
  console.log(days);

  const daysContainer = document.querySelector(".days");

  const dayTemplate = template("#day-template");
  const eventTemplate = template("#event-template");

  days.forEach((day) => {
    if (day.events.length === 0) {
      return;
    }

    const html = dayTemplate(day);
    const tempContainer = document.createElement("DIV");
    tempContainer.innerHTML = html;

    const eventsContainer = tempContainer.querySelector(".events");
    day.events.forEach((event) => {
      const html = eventTemplate(event);
      eventsContainer.innerHTML += html;
    });

    daysContainer.innerHTML += tempContainer.innerHTML;
  })
};

