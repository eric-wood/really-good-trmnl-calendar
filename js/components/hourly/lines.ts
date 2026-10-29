import { Component } from "@/component";
import { MarkerComponent } from "./marker";

interface LinesProps {
  firstDayEl: HTMLElement;
  startTime: Date;
  numHours: number;
}

export class LinesComponent extends Component<LinesProps> {
  static template = "#hourly-lines-template";
  maxLabelWidth = 0;

  postRender() {
    const { firstDayEl, startTime, numHours } = this.props;

    const dayDimensions = firstDayEl.getBoundingClientRect();
    const eventsContainer = firstDayEl.querySelector(".events");

    if (!eventsContainer) {
      console.error("unable to locate .events in day");
      return;
    }

    const eventDimensions = eventsContainer.getBoundingClientRect();

    const startPx = eventDimensions.top - dayDimensions.top;
    const height = eventDimensions.height;
    const pxPerHour = height / numHours;

    let maxLabelWidth = 0;
    for (let i = 0; i < numHours; i += 1) {
      const hour = startTime.getHours();
      startTime.setHours(startTime.getHours() + 1);
      const y = i * pxPerHour + startPx;
      const marker = new MarkerComponent({ y, hour });
      const divider = marker.render(this.el);

      const label = divider.querySelector(".label");
      const labelWidth = label.getBoundingClientRect().width;
      if (labelWidth > maxLabelWidth) {
        maxLabelWidth = labelWidth;
      }
    }

    // make all labels the same width
    this.el.querySelectorAll(".hour-marker .label").forEach((label) => {
      if (!(label instanceof HTMLElement)) {
        return;
      }

      label.style.width = `${maxLabelWidth}px`;
    });

    this.maxLabelWidth = maxLabelWidth;
  }
}
