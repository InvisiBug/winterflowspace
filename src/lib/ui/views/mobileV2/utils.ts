export const getCurrentTimePercentage = (start: string, end: string): number => {
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

export const getOpenClosedRanges = (scheduleArr: any[]) => {
  const result: { free: boolean; start: string; end: string }[] = [];
  let currentStatus = scheduleArr[0];
  let startIdx = 0;

  // Helper to convert index to time string (e.g., "00:00", "01:15")
  const indexToTime = (idx: number) => {
    const hour = Math.floor(idx / 4)
      .toString()
      .padStart(2, "0");
    const minute = ((idx % 4) * 15).toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  for (let i = 1; i <= scheduleArr.length; i++) {
    if (scheduleArr[i] !== currentStatus) {
      result.push({
        free: !currentStatus,
        start: indexToTime(startIdx),
        end: indexToTime(i),
      });
      startIdx = i;
      currentStatus = scheduleArr[i];
    }
  }
  return result;
};
