export default async function getEvents({ pageParam = 0, queryKey }) {
  let url = `https://api.predicthq.com/v1/events/?country=PK&offset=${pageParam}`;

  // Append category if it exists
  if (queryKey[1]) {
    url += `&category=${queryKey[1]}`;
  }
  if (queryKey[2]) {
    url += `&start.gte=${queryKey[2]}`;
  }
  if (queryKey[3]) {
    url += `&end.lte=${queryKey[2]}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: "Bearer Ziv3AxiXp6t2wNq45XyLo9wDlMpktQLUoSfoXdb4",
    },
  });
  return response.json();
}
