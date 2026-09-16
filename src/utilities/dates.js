/**
 * Date helpers for the admin views.
 *
 * The API returns DATE and TIMESTAMP columns as ISO strings built from the
 * server's local time, so they are parsed and read back with local getters.
 * Using UTC getters here would shift dates by one day.
 */

const parse = (value) => {
  if (!value) return null;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

/** Format a date for display, e.g. 11.7.2001. Returns an em dash when empty. */
export const formatDate = (value) => {
  const date = parse(value);
  return date ? date.toLocaleDateString('fi-FI') : '—';
};

/** Format a timestamp for display, e.g. 11.7.2001 klo 9.05. */
export const formatDateTime = (value) => {
  const date = parse(value);
  if (!date) return '—';
  return `${date.toLocaleDateString('fi-FI')} klo ${date.toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

/** Format a date for an <input type="date">, which always expects YYYY-MM-DD. */
export const toDateInputValue = (value) => {
  const date = parse(value);
  if (!date) return '';
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};
