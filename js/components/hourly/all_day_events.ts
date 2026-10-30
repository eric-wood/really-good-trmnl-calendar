import { Component } from "@/component";
import type { Event } from "@/events";
import { AllDayEventComponent } from "./all_day_event";

interface AllDayEventsProps {
  events: Event[];
}

export class AllDayEventsComponent extends Component<AllDayEventsProps> {
  static template = "#all-day-events-template";

  postRender() {
    const { events } = this.props;

    // all-day events get an entry per day, so de-dupe them first
    const eventsById = {};
    const unique = events.filter(({ id }) => {
      if (eventsById[id]) {
        return false;
      }
      eventsById[id] = true;
      return true;
    });

    unique.forEach((event) => {
      const component = new AllDayEventComponent({ event });
      component.render(this.el);
    });
  }
}
