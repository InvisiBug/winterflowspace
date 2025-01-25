import { Gym, ActivitiesEntity } from "@/lib/types/schedule";

/*
  Returns a 2D array of the schedule for the next x days (set to 5)
*/

const debug = false;

interface Schedule {
  start: string;
  end: string;
  duration?: number;
}

/**
 *
 * @param studioInUseToday
 * @returns an array of 24 * 15 elements, each element represents a 15 minute time slot, 0 for free, 1 for busy
 * * note: There's a really annoying point where classes don't start or finish on the hour or on the half hour example, 7:35
 * * This cause problems with the mark timeline function, which is why the Math.floor is in place
 */
export function markTimeline(studioInUseToday: Schedule[]): number[] {
  // Initialize the timeline
  const timeline = new Array<number>((24 * 60) / 15).fill(0);

  // Mark the times in the timeline
  for (const timeSlot of studioInUseToday) {
    const start = Math.floor((parseInt(timeSlot.start.split(":")[0]) * 60 + parseInt(timeSlot.start.split(":")[1])) / 15);
    const end = Math.floor((parseInt(timeSlot.end.split(":")[0]) * 60 + parseInt(timeSlot.end.split(":")[1])) / 15);

    for (let i = start; i < end; i++) {
      timeline[i] = 1;
    }
  }
  return timeline;
}

// export function getFreeTimes(inUseTimes: { start: string; end: string }[]): { start: string; end: string }[] {
//   // Sort the in-use times
//   inUseTimes.sort((a, b) => a.start.localeCompare(b.start));

//   const freeTimes: { start: string; end: string }[] = [];
//   let freeTimeEnd = "00:00";

//   for (const inUseTime of inUseTimes) {
//     if (freeTimeEnd !== inUseTime.start) {
//       freeTimes.push({ start: freeTimeEnd, end: inUseTime.start });
//     }
//     freeTimeEnd = inUseTime.end;
//   }

//   if (freeTimeEnd !== "23:59") {
//     freeTimes.push({ start: freeTimeEnd, end: "23:59" });
//   }

//   return freeTimes;
// }

// export function getFreeTimesSchedule(schedule: { start: string; end: string; duration: number }[]): { start: string; end: string }[] {
//   // Sort the schedule by start time
//   schedule.sort((a, b) => a.start.localeCompare(b.start));

//   const freeTimes: { start: string; end: string }[] = [];
//   let freeTimeEnd = "00:00";

//   for (let i = 0; i < schedule.length; i++) {
//     const current = schedule[i];
//     const next = schedule[i + 1];

//     if (next && current.end !== next.start) {
//       freeTimes.push({ start: current.end, end: next.start });
//     } else if (!next && current.end !== "23:59") {
//       freeTimes.push({ start: current.end, end: "23:59" });
//     }

//     freeTimeEnd = current.end;
//   }

//   return freeTimes;
// }

// export function timeBetweenDates(date1: Date, date2: Date): string {
//   const diffInMs = Math.abs(date2.getTime() - date1.getTime());
//   const diffInSecs = Math.floor(diffInMs / 1000);
//   const days = Math.floor(diffInSecs / 86400);
//   const hours = Math.floor(diffInSecs / 3600) % 24;
//   const minutes = Math.floor(diffInSecs / 60) % 60;
//   const seconds = diffInSecs % 60;
//   return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
// }
