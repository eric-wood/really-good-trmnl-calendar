import lodashTemplate from "lodash-es/template";
import { querySelector } from "./util";

export const template = (selector: string) => {
  const el = querySelector(selector);
  const raw = el.innerHTML;
  const compiled = lodashTemplate(raw, { interpolate: /{{([\s\S]+?)}}/g });

  return (...args: any) => {
    const html = compiled(...args);
    const container = document.createElement("div");
    container.innerHTML = html;

    return container.children[0] as HTMLElement;
  };
};
