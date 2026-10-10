import { Component } from "@/component";

interface MarkerProps {
  y: number;
  hour: number;
}

export class MarkerComponent extends Component<MarkerProps> {
  static template = "#hour-marker-template";

  getProps() {
    const { y, hour } = this.props;

    return { y, hour };
  }
}
