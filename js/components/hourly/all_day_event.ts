import { Component } from "@/component";
import type { Event } from "@/events";

interface AllDayEventProps {
  event: Event;
}

export class AllDayEventComponent extends Component<AllDayEventProps> {
  static template = "#all-day-event-template";

  getProps() {
    const { name } = this.props.event;

    return {
      name,
    };
  }

  postRender() {}
}
