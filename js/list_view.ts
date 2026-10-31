import type { Day } from "@/events";
import { Format } from "@/main";
import { ListComponent } from "./components/list/list";

export const renderListView = (days: Day[], format: Format) => {
  const container = document.querySelector(".layout") as HTMLElement;
  const component = new ListComponent({ days, format });
  component.render(container);
};
