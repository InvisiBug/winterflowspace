import { ActivitiesEntity, ClassData } from "@/lib/types/schedule";

const debug = false;

export const getCurrentHour = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours;
};

export const parseSchedule = (data: ActivitiesEntity[]) => {
  if (debug) console.log(data);
  const numDays = 5;
  const busySchedule: ClassData[][] = [];

  //* Create an array of times the studio is in use over the next 3 days
  Array.from({ length: numDays }).forEach((_, dayIndex: number) => {
    const todaysSchedule = new Array<ClassData>();

    data.forEach((element: ActivitiesEntity) => {
      if (element.studio === "Studio" || element.studio === "Functional Area") {
        const rawStartTime = element.startDateTime.dateTime.replace("T", " "); // They keep changing the date format so pulled it out here
        const d = new Date();

        const now = new Date(d.setDate(d.getDate() + dayIndex));
        const date = new Date(Date.parse(rawStartTime));

        if (debug) console.log(rawStartTime);
        if (debug) console.log(now.setHours(0, 0, 0, 0), date.setHours(0, 0, 0, 0));

        // Get only the events for the day
        if (now.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
          if (debug) console.log("Here");
          const startHours = String(new Date(rawStartTime).getHours()).padStart(2, "0");
          const startMinutes = String(new Date(rawStartTime).getMinutes()).padStart(2, "0");

          const endHours = String(new Date(Date.parse(rawStartTime) + element.duration * 60000).getHours()).padStart(2, "0");
          const endMinutes = String(new Date(Date.parse(rawStartTime) + element.duration * 60000).getMinutes()).padStart(2, "0");

          todaysSchedule.push({
            start: `${startHours}:${startMinutes}`,
            end: `${endHours}:${endMinutes}`,
            duration: element.duration,
          });
        }
      }
    });
    busySchedule.push(todaysSchedule);
  });

  const finalSchedule = new Array<number[]>();

  if (debug) console.log("busy schedule", busySchedule);

  Array.from({ length: numDays }).forEach((_, dayIndex: number) => {
    finalSchedule.push(markTimeline(busySchedule[dayIndex]));
  });

  return finalSchedule;
};

/**
 *
 * @param studioInUseToday
 * @returns an array of 24 * 15 elements, each element represents a 15 minute time slot, 0 for free, 1 for busy
 * * note: There's a really annoying point where classes don't start or finish on the hour or on the half hour example, 7:35
 * * This cause problems with the mark timeline function, which is why the Math.floor is in place
 */
export function markTimeline(studioInUseToday: ClassData[]): number[] {
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
