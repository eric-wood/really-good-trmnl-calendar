import { Component } from "@/component";
import type { Day } from "@/events";
import { EventComponent } from "@/components/hourly/event";

interface DayProps {
  day: Day;
  startTime: Date;
  endTime: Date;
  numCalendars: number;
}

export class DayComponent extends Component<DayProps> {
  static template = "#day-template-hourly";
  eventComponents: EventComponent[] = [];

  getProps() {
    const { dayOfWeek, dateString } = this.props.day;

    return {
      dayOfWeek,
      dateString,
    };
  }

  postRender() {
    const { day, startTime, endTime, numCalendars } = this.props;

    const eventsContainer = this.el.querySelector(".events") as HTMLElement;
    const height = eventsContainer.getBoundingClientRect().height;

    this.eventComponents = day.events
      .map((event) => {
        if (event.allDay || !(event.start < endTime && event.end > startTime)) {
          return;
        }

        const eventComponent = new EventComponent({
          event,
          containerHeight: height,
          startTime,
          endTime,
          showBand: numCalendars > 1,
        });

        eventComponent.render(eventsContainer);
        return eventComponent;
      })
      .filter(Boolean);
  }

  fitEvents() {
    this.eventComponents.forEach((event) => {
      event.adjustFit();
    });
  }
}
