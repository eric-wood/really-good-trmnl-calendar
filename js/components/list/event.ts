import { Component } from "@/component";
import type { Event } from "@/events";

interface EventProps {
  event: Event;
}

export class EventComponent extends Component<EventProps> {
  static template = "#event-template";

  getProps() {
    const { calendarIndex, name, durationString } = this.props.event;
    return {
      calendarIndex,
      name,
      durationString,
    };
  }
}
