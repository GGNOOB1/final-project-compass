export function formatDate(date) {
  const currentDate = String(date);
  const formatedDate = currentDate.split('/').reverse().join('-');

  const newDate = new Date(formatedDate);
  return newDate;
}
