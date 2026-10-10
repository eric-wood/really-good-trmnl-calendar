import { template } from "@/template";

export class Component<Props extends object = object> {
  static template = "";
  t: ((...args: any) => HTMLElement) | undefined;
  props: Props;

  constructor(props: Props) {
    this.t = template((this.constructor as typeof Component).template);
    this.props = props;
  }

  getProps(): Object {
    return this.props;
  }

  postRender(_el: HTMLElement) {}

  render(container: HTMLElement): HTMLElement {
    if (!this.t) {
      console.error("template not defined, somehow");
      return;
    }

    const el = this.t(this.getProps());
    container.appendChild(el);
    this.postRender(el);
    return el;
  }
}
