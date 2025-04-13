export const BookingStatus = ['Available', 'Booked', 'Canceled'];

export const bookedStatus = {
  Available: 'Available',
  Booked: 'Booked',
  Canceled: 'Canceled',
} as const;

export const slotDefine = (
  startTime: string,
  endTime: string,
  serviceDuration: number, // in minutes
) => {
  const toMinutes = (time: string) => {
    const [hour, min] = time.split(':').map(Number);
    return hour * 60 + min;
  };

  const minutesToTime = (min: number) => {
    const h = Math.floor(min / 60)
      .toString()
      .padStart(2, '0');
    const m = (min % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const slots = [];

  for (let t = start; t + serviceDuration <= end; t += serviceDuration) {
    slots.push({
      startTime: minutesToTime(t),
      endTime: minutesToTime(t + serviceDuration),
    });
  }

  return slots;
};
