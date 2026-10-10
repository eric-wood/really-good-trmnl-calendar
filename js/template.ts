import lodashTemplate from "lodash-es/template";

export const template = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) {
    console.error(`unable to locate template ${selector}`);
    return;
  }

  const raw = el.innerHTML;
  const compiled = lodashTemplate(raw, { interpolate: /{{([\s\S]+?)}}/g });

  return (...args: any) => {
    const html = compiled(...args);
    const container = document.createElement("div");
    container.innerHTML = html;

    return container.children[0] as HTMLElement;
  };
};
