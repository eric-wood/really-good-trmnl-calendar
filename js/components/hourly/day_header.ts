import { Component } from "@/component";
import type { Day } from "@/events";

interface DayHeaderProps {
  day: Day;
}

export class DayHeaderComponent extends Component<DayHeaderProps> {
  static template = "#day-header-template-hourly";

  getProps() {
    const { dayOfWeek, dateString } = this.props.day;

    return {
      dayOfWeek,
      dateString,
    };
  }
}
