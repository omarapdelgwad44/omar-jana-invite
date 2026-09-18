export type TimeParts = {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getEventDate(iso: string): Date {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid engagement date");
  }
  return date;
}

export function getTimeParts(target: Date, now = Date.now()): TimeParts {
  const diff = target.getTime() - now;

  if (!Number.isFinite(diff)) {
    throw new Error("Unable to calculate countdown");
  }

  if (diff <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { expired: false, days, hours, minutes, seconds };
}

export function pad(value: number): string {
  return String(value).padStart(2, "0");
}
