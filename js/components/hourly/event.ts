import { Component } from "@/component";
import type { Event } from "@/events";

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

  getProps() {
    const event = this.props.event;

    const offset =
      this.props.containerHeight /
      (this.props.endTime.valueOf() - this.props.startTime.valueOf());
    const top =
      (event.start.valueOf() - this.props.startTime.valueOf()) * offset;
    const bottom =
      this.props.containerHeight -
      (event.end.valueOf() - this.props.startTime.valueOf()) * offset;

    const { name, durationString } = event;
    const showBand = this.props.showBand;

    // TODO: figure out how to skip render? should the parent filter?

    return {
      top,
      bottom,
      name,
      durationString,
      showBand,
    };
  }

  postRender() {
    if (this.props.showBand) {
      const calendarIndex = this.props.event.calendarIndex;

      const stripe = this.el.querySelector(".stripe");
      stripe.classList.add(`bg--gray-${backgrounds[calendarIndex]}`);

      const stripeWidth = stripe.getBoundingClientRect().width;
      this.el.style.paddingRight = `${stripeWidth + 3}px`;
    }
  }

  adjustFit() {
    const timeEl = this.el.querySelector(".time") as HTMLElement;
    const nameEl = this.el.querySelector(".name") as HTMLElement;

    //console.group();
    //console.log(this.props.event.name);
    if (isOverflowingY(this.el)) {
      this.el.classList.add("single-line");
      //console.log("collapse to single line");
    }

    if (isOverflowingY(this.el) || textWrapping(timeEl)) {
      //timeEl.remove();
      //console.log("remove time element");
    }

    if (isOverflowingY(this.el)) {
      // if we're still overflowing on the Y axis let's lower the font size
      nameEl.classList.add("label--small");
      //console.log("smaller label");
    }

    if (isOverflowingY(this.el)) {
      // okay, we can't win here, the duration is shorter than we can render with text visible;
      // we'll just set the height to be the minimum heigh possible to render the small text,
      // even if it isn't technically accurate (this is how most calendar apps handle it)
      const height = this.el.scrollHeight + 3;
      this.el.style.height = `${height}px`;
    }
    //console.groupEnd();
  }
}

const isOverflowingY = (el: HTMLElement) =>
  el.scrollHeight > el.getBoundingClientRect().height;

const textWrapping = (el: HTMLElement) => {
  const fontSize = parseInt(window.getComputedStyle(el).fontSize, 10);
  const height = el.getBoundingClientRect().height;

  return height > fontSize * 2;
};
