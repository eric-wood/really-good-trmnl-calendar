import { Component } from "@/component";
import { Day, Event, minMaxHour } from "@/events";
import { Format } from "@/main";
import { AllDayEventsComponent } from "./all_day_events";
import { DayHeaderComponent } from "./day_header";
import { DayComponent } from "./day";
import { verticalDivider } from "@/util";
import { LinesComponent } from "./lines";

interface HourlyProps {
  days: Day[];
  format: Format;
  startDate: Date;
}

export class HourlyComponent extends Component<HourlyProps> {
  static template = "#hourly-template";
  elements = {
    linesContainer: ".lines",
  };

  postRender() {
    const { days, startDate } = this.props;

    const allEvents = days.flatMap(({ events }) => events);
    const numCalendars = new Set(
      allEvents.map(({ calendarIndex }) => calendarIndex),
    ).size;

    this.renderHeaders();
    this.renderAllDay(allEvents);

    const weekWindow = minMaxHour(allEvents);

    // TODO: logic to handle when this duration is tiny; maybe set a min day size?
    const numHours = weekWindow.numHours;
    const startTime = weekWindow.min;
    const endTime = weekWindow.max;

    const dayComponents = days.map((day, i) => {
      startTime.setDate(startDate.getDate() + i);
      endTime.setDate(startDate.getDate() + i);

      const dayComponent = new DayComponent({
        day,
        startTime,
        endTime,
        numCalendars,
      });

      dayComponent.render(this.el);

      if (i < days.length - 1) {
        const divider = verticalDivider();
        divider.style.gridColumn = `${i + 2}`;
        this.el.appendChild(divider);
      }
      return dayComponent;
    });

    const linesComponent = new LinesComponent({
      firstDayEl: dayComponents[0].el,
      startTime,
      numHours,
    });
    linesComponent.render(this.el);

    this.el.style.paddingLeft = `${linesComponent.maxLabelWidth + 10}px`;

    dayComponents.forEach((day) => {
      day.fitEvents();
    });
  }

  renderHeaders() {
    const { days } = this.props;

    days.forEach((day) => {
      const headerComponent = new DayHeaderComponent({ day });
      headerComponent.render(this.el);
    });
  }

  renderAllDay(allEvents: Event[]) {
    const { days, startDate } = this.props;

    const allDayEvents = allEvents.filter(({ allDay }) => allDay);
    const allDayEventsComponent = new AllDayEventsComponent({
      events: allDayEvents,
      startDate,
      numDays: days.length,
    });
    allDayEventsComponent.render(this.el);
  }
}
