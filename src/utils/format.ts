export function currency(value: number, opts?: {compact?: boolean;symbol?: string;}): string {
  const symbol = opts?.symbol ?? '$';
  const abs = Math.abs(value);
  if (opts?.compact) {
    if (abs >= 1_000_000) return `${value < 0 ? '-' : ''}${symbol}${(abs / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `${value < 0 ? '-' : ''}${symbol}${(abs / 1_000).toFixed(1)}K`;
  }
  return `${value < 0 ? '-' : ''}${symbol}${abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function number(value: number, digits = 0): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

export function percent(value: number, digits = 1): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(digits)}%`;
}

export function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', yyyy: undefined, year: 'numeric' } as Intl.DateTimeFormatOptions);
}

export function initials(name: string): string {
  return name.
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((n) => n[0]?.toUpperCase()).
  join('');
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}