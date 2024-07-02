export default async function getMounthEvents() {
  const currentDate = new Date();

  // Get the start date of the current month
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startDateISO = startDate.toISOString();

  // Get the end date of the current month
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const endDateISO = endDate.toISOString();

  const response = await fetch(
    `https://api.predicthq.com/v1/events/?country=PK&start.gte=${startDateISO}&end.lte=${endDateISO}`,
    {
      method: "GET",
      headers: {
        authorization: "Bearer Ziv3AxiXp6t2wNq45XyLo9wDlMpktQLUoSfoXdb4",
      },
    }
  );
  return response.json();
}
