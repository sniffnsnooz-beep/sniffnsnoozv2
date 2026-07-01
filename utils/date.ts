export function isValidDate(dateStr: string) {
  const selected = new Date(dateStr);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selected.setHours(0, 0, 0, 0);

  const diff =
    (selected.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  return diff >= 1; // minimum 1 day advance
}
