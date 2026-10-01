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

