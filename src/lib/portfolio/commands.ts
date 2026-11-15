/**
 * Portfolio Command & Navigation logic
 */
export interface CommandItem {
  id: string;
  label: string;
  category: "navigation" | "action" | "social";
  description: string;
  action: () => void;
}

export function greetingFor(name: string, date = new Date()): string {
  const h = date.getHours();
  if (h >= 5 && h < 12) return `Good morning, ${name}`;
  if (h >= 12 && h < 17) return `Good afternoon, ${name}`;
  if (h >= 17 && h < 22) return `Good evening, ${name}`;
  return `Still up, ${name}?`;
}
