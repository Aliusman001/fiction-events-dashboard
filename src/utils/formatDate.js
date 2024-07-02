export default function formatDate(dateString) {
  const date = new Date(dateString);

  // Define options for formatting
  const options = {
    weekday: "short", // abbreviated day of the week
    day: "numeric", // day of the month
    month: "short", // abbreviated month name
  };

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}
