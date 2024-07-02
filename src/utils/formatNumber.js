export default function formatNumber(number) {
  // Convert the number to a string
  const numString = number?.toString();

  // Check if the number is greater than or equal to 1000
  if (number >= 1000) {
    // Divide the number by 1000
    const formatted = (number / 1000).toFixed(2);

    // Check if the number is a whole number when divided by 1000
    if (formatted.slice(-3) === ".00") {
      return (number / 1000).toFixed(0) + "k";
    } else {
      return formatted.replace(/\.?0*$/, "") + "k";
    }
  }

  // Return the original number as string if it's less than 1000
  return numString;
}
