import { Component } from "@/component";
import { Day } from "@/events";
import { Format } from "@/main";
import { verticalDivider } from "@/util";
import { DayComponent } from "./day";

interface ListProps {
  days: Day[];
  format: Format;
}

export class ListComponent extends Component<ListProps> {
  static template = "#list-view-template";

  postRender() {
    const { days, format } = this.props;

    const columns = format === "full" && !window.config.single_column;

    // we take extra care to ensure we only render as many events as can fit in the vertical height!
    const maxBottom = this.el.getBoundingClientRect().bottom;

    const dayComponents = [];
    let i = 0;
    for (const day of days) {
      if (!columns && day.events.length === 0) {
        continue;
      }

      if (columns && i > 0) {
        // stupid hack around the fact that templates have to contain a single root node
        this.el.appendChild(verticalDivider());
      }

      const dayComponent = new DayComponent({
        day,
        maxBottom,
        removeIfEmpty: !columns,
        deferFitting: columns,
      });
      dayComponent.render(this.el);
      dayComponents.push(dayComponent);

      i += 1;
      if (!columns && dayComponent.exhausted) {
        break;
      }
    }

    if (columns) {
      dayComponents.forEach((day) => day.removeExcessEvents());
    }
  }
}
