import { Component } from "@/component";
import type { Event } from "@/events";

interface AllDayEventProps {
  event: Event;
  startDate: Date;
  numDays: number;
}

export class AllDayEventComponent extends Component<AllDayEventProps> {
  static template = "#all-day-event-template";

  getProps() {
    const { event, startDate, numDays } = this.props;
    const { name } = event;

    const classes = [];

    let column = dateDiff(startDate, event.start) + 1;
    if (column <= 0) {
      // event starts before today but renders as starting today
      column = 1;
      classes.push("before");
    }

    let eventLen = dateDiff(startDate, event.end);

    let span = eventLen;
    if (eventLen > numDays) {
      // day is longer than number of days we're showing
      span = numDays;
      classes.push("after");
    }

    span += 1;

    const className = classes.join(" ");

    return {
      name,
      column,
      span,
      className,
    };
  }

  postRender() {}
}

const dateDiff = (date1: Date, date2: Date) =>
  Math.round((date2.valueOf() - date1.valueOf()) / (1000 * 60 * 60 * 24));
