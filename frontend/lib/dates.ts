/**
 * Calendar-day helpers, always in the user's local time.
 *
 * Do not use `toISOString().split("T")[0]` for "today": toISOString() is in UTC,
 * so in Algeria (UTC+1) the day would only change at 1 a.m.
 */

/** "YYYY-MM-DD" for the local calendar day of `date` (default: now). */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Local day key of a stored ISO timestamp (records keep `new Date().toISOString()`). */
export function dayKeyOf(isoDate: string): string {
  return dayKey(new Date(isoDate));
}

/** Local day key `days` days before `from`. */
export function daysBefore(days: number, from: Date = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() - days);
  return dayKey(d);
}
