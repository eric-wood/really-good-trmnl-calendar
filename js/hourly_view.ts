import type { Format } from "@/main";
import type { Day } from "@/events";
import { HourlyComponent } from "@/components/hourly/hourly";

export const renderHourlyView = (
  days: Day[],
  startDate: Date,
  format: Format,
) => {
  const container = document.querySelector(".layout") as HTMLElement;
  const hourlyComponent = new HourlyComponent({ days, format, startDate });
  hourlyComponent.render(container);
};
