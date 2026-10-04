const fullDay = 60 * 60 * 24 * 1000;

const formatTimeDuration = (startDate, endDate, allDay) => {
  const formatTime = (d) => d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: window.config.time_format === '12',
  }).toLowerCase();

  if (allDay) {
    return "All day";
  }

  const start = formatTime(startDate);
  const end = formatTime(endDate);

  return `${start} - ${end}`;
}

// spelled out (not built from the index) so `trmnlp lint` sees the fields used
const calendarNames = [
  window.config.calendar_1_name,
  window.config.calendar_2_name,
  window.config.calendar_3_name,
];

// put the events into a friendlier format!
// window.rawEvents is one array per calendar; null for missing/failed ones
export const prepEvents = () => {
  const events = window.rawEvents.flatMap((calendarEvents, calendarIndex) => {
    const calendarName = calendarNames[calendarIndex] || `Calendar ${calendarIndex + 1}`;

    return (calendarEvents ?? []).map((event) => {
      const start = new Date(event.DTSTART);
      const end = new Date(event.DTEND);
      const name = event.SUMMARY;

      const allDay = end - start >= fullDay;
      const durationString = formatTimeDuration(start, end, allDay);

      return {
        start,
        end,
        durationString,
        name,
        allDay,
        calendarIndex,
        calendarName,
      };
    });
  });
  return events;
}

export const bucketEvents = (allEvents, startDate, numDays) => {
  startDate.setHours(0, 0, 0, 0);

  // sort once up front; filter below preserves order within each day
  const sortedEvents = [...allEvents].sort((a, b) => a.start - b.start);

  return [...Array(numDays).keys()].map((i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const events = sortedEvents.filter(({ start, end }) => start < endDate && end > date);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const dateString = date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });

    return {
      date,
      dayOfWeek,
      dateString,
      events,
    };
  });
}

// clones the passed in date and sets all date-related parameters to match
// those of the reference date
export const normalizeDay = (d, reference) => {
  const date = new Date(d);
  date.setFullYear(reference.getFullYear(), reference.getMonth(), reference.getDate());
  return date;
}

// For a list of events across a series of days, figure out the earliest and latest
// hour events begin and end on so the we can make informed decisions on what window
// of time to show in the hourly views
//
// The returned Date objects are solely to represent time and the date portion can
// be disregarded or updated on the fly if need be.
export const minMaxHour = (events) => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = -Infinity;

  const today = new Date();

  events.forEach((event) => {
    if (event.allDay) {
      return;
    }

    const end = normalizeDay(event.end, today);
    if (end > max) {
      max = end;
    }

    const start = normalizeDay(event.start, today);
    if (start < min) {
      min = start;
    }
  });

  if (max.getMinutes() > 0) {
    max.setHours(max.getHours() + 1);
  }

  min.setMinutes(0);
  min.setSeconds(0);
  min.setMilliseconds(0);

  max.setMinutes(0);
  max.setSeconds(0);
  max.setMilliseconds(0);

  const numHours = max.getHours() - min.getHours();

  return { min, max, numHours };
}

