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
    calendar_1_name?: string;
    calendar_2_name?: string;
    calendar_3_name?: string;
    num_days?: string | number;
    single_column?: string;
  }

  interface Window {
    rawEvents: (RawEvent[] | null)[]; // one slot per calendar; null if missing/failed
    config: Config;
    renderEvents: (format: string) => void;
  }
}
