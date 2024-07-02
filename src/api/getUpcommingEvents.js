export default async function getUpcommingEvents({ pageParam = 0 }) {
  const response = await fetch(
    `https://api.predicthq.com/v1/events/?country=PK&offset=${pageParam}&start.gte=${new Date().toISOString()}`,
    {
      method: "GET",
      headers: {
        authorization: "Bearer Ziv3AxiXp6t2wNq45XyLo9wDlMpktQLUoSfoXdb4",
      },
    }
  );
  return response.json();
}
