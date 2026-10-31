export {};

export type ViewType = "list" | "hourly";

declare global {
  interface RawEvent {
    DTSTART: string;
    DTEND: string;
    SUMMARY: string;
    UID: string;
    [key: string]: unknown; // RRULE, TRANSP, RECURRENCE_INSTANCE, ...
  }

  interface Config {
    time_format?: "12" | "24";
    view_type?: ViewType;
    num_days?: string | number;
    single_column?: boolean;
    show_title_bar: boolean;
  }

  interface Window {
    rawEvents: (RawEvent[] | null)[]; // one slot per calendar; null if missing/failed
    config: Config;
    renderEvents: (format: string) => void;
  }
}
