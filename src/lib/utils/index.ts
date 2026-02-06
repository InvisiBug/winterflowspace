export const getCurrentTimePercentage = (start: string, end: string) => {
  // Assumes start and end are in "HH:mm" format
  const now = new Date();
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startTime = new Date(now);
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date(now);
  endTime.setHours(endHour, endMinute, 0, 0);

  const total = endTime.getTime() - startTime.getTime();
  const elapsed = now.getTime() - startTime.getTime();

  if (total <= 0) return 0;
  if (elapsed <= 0) return 0;
  if (elapsed >= total) return 100;

  return (elapsed / total) * 100;
};

export const formatTo12Hour = (time: string) => {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || "00";
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};
interface Booking {
  free: boolean;
  start: string; // HH:MM format
  end: string; // HH:MM format
}

export const fillFreeSlots = (bookings: Booking[]) => {
  // Sort bookings by start time
  const sortedBookings = [...bookings].sort((a, b) => a.start.localeCompare(b.start));
  const completeSchedule: Booking[] = [];
  let currentTime = "00:00";

  for (let i = 0; i < sortedBookings.length; i++) {
    const booking = sortedBookings[i];

    // Add free slot before this booking if there's a gap
    if (currentTime < booking.start) {
      completeSchedule.push({
        free: true,
        start: currentTime,
        end: booking.start,
      });
    }

    // Check if this is a non-free booking that should be merged with consecutive ones
    if (!booking.free) {
      const mergedStart = booking.start;
      let mergedEnd = booking.end;
      const mergedBooking = { ...booking };

      // Look ahead to merge consecutive non-free bookings
      let j = i + 1;
      while (j < sortedBookings.length && !sortedBookings[j].free && sortedBookings[j].start === mergedEnd) {
        mergedEnd = sortedBookings[j].end;
        j++;
      }

      // Add the merged booking
      completeSchedule.push({
        ...mergedBooking,
        start: mergedStart,
        end: mergedEnd,
      });

      // Skip the bookings we've merged
      i = j - 1;
      currentTime = mergedEnd;
    } else {
      // Add individual free booking as-is
      completeSchedule.push(booking);
      currentTime = booking.end;
    }
  }

  // Add final free slot if day doesn't end with a booking
  if (currentTime < "24:00") {
    completeSchedule.push({
      start: currentTime,
      end: "24:00",
      free: true,
    });
  }

  return completeSchedule;
};
