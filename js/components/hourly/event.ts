import { Component } from "@/component";
import type { Event } from "@/events";
import { isOverflowingY, isOverflowingX, textWrapping } from "@/util";

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
  elements = {
    time: ".time",
    name: ".name",
    stripe: ".stripe",
  };

  getProps() {
    const event = this.props.event;

    const { name, durationString } = event;

    return {
      name,
      durationString,
    };
  }

  postRender() {
    const { event, containerHeight, startTime, endTime, showBand } = this.props;
    const offset = containerHeight / (endTime.valueOf() - startTime.valueOf());
    const top = (event.start.valueOf() - startTime.valueOf()) * offset;
    const bottom =
      containerHeight - (event.end.valueOf() - startTime.valueOf()) * offset;

    // ensure the borders don't double up
    if (event.lane > 0) {
      this.el.style.borderLeft = "0";
    }

    this.el.style.top = `${top}px`;
    this.el.style.bottom = `${bottom}px`;

    if (event.widthPercentage !== 100) {
      const left = event.lane * event.widthPercentage;
      this.el.style.width = `${event.widthPercentage}%`;
      this.el.style.left = `${left}%`;
    }

    if (showBand) {
      const calendarIndex = event.calendarIndex;

      this.els.stripe.classList.add(`bg--gray-${backgrounds[calendarIndex]}`);

      const stripeWidth = this.els.stripe.getBoundingClientRect().width;
      this.el.style.paddingRight = `${stripeWidth + 3}px`;
    }

    if (event.widthPercentage === 100) {
      const offset = event.depth * 6;
      this.el.style.left = `${offset}px`;
    }
  }

  adjustFit() {
    if (textWrapping(this.els.time)) {
      this.el.classList.add("multi-line");
    }

    if (isOverflowingY(this.el) || isOverflowingX(this.el)) {
      // if we're still overflowing on the Y axis let's lower the font size
      this.els.name.classList.add("label--small");
    }

    if (isOverflowingY(this.el)) {
      // okay, we can't win here, the duration is shorter than we can render with text visible;
      // we'll just set the height to be the minimum heigh possible to render the small text,
      // even if it isn't technically accurate (this is how most calendar apps handle it)
      const height = this.el.scrollHeight + 3;
      this.el.style.height = `${height}px`;
    }

    if (isOverflowingY(this.el)) {
      this.els.time.remove();
    }
  }
}
