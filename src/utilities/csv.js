import Papa from 'papaparse';

/**
 * Download rows as a CSV file.
 *
 * Semicolon separated and prefixed with a byte order mark: Excel in a Finnish
 * locale expects semicolons, and without the BOM it reads the file as Latin-1
 * and mangles every ä and ö.
 */
export const downloadCsv = (filename, fields, rows) => {
  const csv = Papa.unparse({ fields, data: rows }, { delimiter: ';' });
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/** YYYY-MM-DD for use in a file name. */
export const today = () => {
  const now = new Date();
  const pad = (n) => `${n}`.padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
