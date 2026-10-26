import { template } from "@/template";

export class Component<Props extends object = object> {
  static template = "";
  t: ((...args: any) => HTMLElement) | undefined;
  props: Props;
  el: HTMLElement | null = null;
  els: { [name: string]: HTMLElement };
  elements: { [name: string]: string };

  constructor(props: Props) {
    this.t = template((this.constructor as typeof Component).template);
    this.props = props;
    this.els = {};
  }

  getProps(): Object {
    return this.props;
  }

  postRender() {}

  render(container: HTMLElement): HTMLElement {
    if (!this.t) {
      console.error("template not defined, somehow");
      return;
    }

    const el = this.t(this.getProps());
    this.el = el;
    container.appendChild(el);

    Object.entries(this.elements ?? {}).forEach(([name, selector]) => {
      this.els[name] = this.el.querySelector(selector);
    });

    this.postRender();
    return el;
  }

  querySelector(selector: string): HTMLElement | undefined {
    return this.el.querySelector(selector);
  }
}
