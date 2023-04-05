export function formatDateForResponse(date) {
  const dateString = new Date(date).toISOString();
  const dateParts = dateString.split('T')[0].split('-');
  date = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];

  return date;
}
