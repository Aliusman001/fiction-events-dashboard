export default function formatTo12HourTime(dateString) {
  // Create a new Date object from the dateString
  const date = new Date(dateString);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes with leading zero if necessary
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Combine hours, minutes, and AM/PM suffix
  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}
