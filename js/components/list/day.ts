import { Component } from "@/component";
import type { Day } from "@/events";
import { EventComponent } from "@/components/list/event";

interface DayProps {
  day: Day;
  maxBottom: number;
  removeIfEmpty: boolean;
}

export class DayComponent extends Component<DayProps> {
  static template = "#day-template-list";
  exhausted = false;
  eventsRendered = 0;

  getProps() {
    const { dayOfWeek, dateString } = this.props.day;

    return {
      dayOfWeek,
      dateString,
    };
  }

  postRender() {
    const { day, maxBottom, removeIfEmpty } = this.props;
    const eventsContainer = this.el.querySelector(".events") as HTMLElement;

    for (const event of day.events) {
      const eventComponent = new EventComponent({ event });
      const eventEl = eventComponent.render(eventsContainer);

      if (this.el.getBoundingClientRect().bottom > maxBottom) {
        eventEl.remove();
        this.exhausted = true;
        break;
      }

      this.eventsRendered += 1;
    }

    if (removeIfEmpty && this.eventsRendered === 0) {
      this.el.remove();
    }
  }
}
