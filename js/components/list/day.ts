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
  elements = {
    eventsContainer: ".events",
  };

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

    for (const event of day.events) {
      const eventComponent = new EventComponent({ event });
      const eventEl = eventComponent.render(this.els.eventsContainer);

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

  // this has to be called after all of the columns are rendered because each new
  // column potentially compresses and wraps the text in the columns before it
  removeExcessEvents() {
    while (this.el.scrollHeight > this.props.maxBottom) {
      this.els.eventsContainer.lastChild.remove();
    }
  }
}
