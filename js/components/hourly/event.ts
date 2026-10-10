import { Component } from "@/component";
import type { Event } from "@/events";

const backgrounds = [10, 30, 60];

interface EventProps {
  event: Event;
  containerHeight: number;
  startTime: Date;
  endTime: Date;
  showBand: boolean;
}

export class EventComponent extends Component<EventProps> {
  static template = "#hourly-event";

  constructor(props: EventProps) {
    super(props);
  }

  getProps() {
    const event = this.props.event;

    const offset =
      this.props.containerHeight /
      (this.props.endTime.valueOf() - this.props.startTime.valueOf());
    const top =
      (event.start.valueOf() - this.props.startTime.valueOf()) * offset;
    const bottom =
      this.props.containerHeight -
      (event.end.valueOf() - this.props.startTime.valueOf()) * offset;

    const { name, durationString } = event;
    const showBand = this.props.showBand;

    // TODO: figure out how to skip render? should the parent filter?

    return {
      top,
      bottom,
      name,
      durationString,
      showBand,
    };
  }

  postRender(el: HTMLElement) {
    if (this.props.showBand) {
      const calendarIndex = this.props.event.calendarIndex;

      el.querySelector(".stripe").classList.add(
        `bg--gray-${backgrounds[calendarIndex]}`,
      );
    }
  }
}
