import { Component } from "@/component";
import type { Day } from "@/events";
import { EventComponent } from "@/components/hourly/event";
import { AllDayEventComponent } from "./all_day_event";

interface DayProps {
  day: Day;
  startTime: Date;
  endTime: Date;
  numCalendars: number;
}

export class DayComponent extends Component<DayProps> {
  static template = "#day-template-hourly";
  elements = {
    eventsContainer: ".events",
  };
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

    const height = this.els.eventsContainer.getBoundingClientRect().height;

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

        eventComponent.render(this.els.eventsContainer);
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
