import EventTable from "./EventTable";
import { useEffect, useState } from "react";

import Cards from "./Cards";
import EventTableHead from "./EventTableHead";
import { useInfiniteQuery } from "@tanstack/react-query";
import getEvents from "../api/getEvents";
import { useMemo } from "react";
import FilterForm from "./FilterForm";

function EventList() {
  const [events, setEvents] = useState({});
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // console.log(from);
  // console.log(to);

  const { data, error, isLoading, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["Events", category, from, to],
      queryFn: getEvents,
      getNextPageParam: (page) => {
        const nextPage = page.next
          ? page.next.split("=")[page.next.split("=").length - 1]
          : null;

        return nextPage;
      },
    });

  useEffect(
    function () {
      if (data) {
        setEvents(data);
      }
    },
    [data]
  );

  const eventContent = useMemo(() => {
    return { events, isLoading };
  }, [events, isLoading]);

  const tableContent = useMemo(() => {
    return {
      events,
      setEvents,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      error,
      refetch,
    };
  }, [events, setEvents, isLoading, fetchNextPage, isFetchingNextPage, error]);

  const formData = useMemo(() => {
    return { category, from, to };
  }, [category, from, to]);

  return (
    <div className="w-full md:row-span-2">
      <EventTableHead>
        <FilterForm
          setCategory={setCategory}
          setFrom={setFrom}
          setTo={setTo}
          formData={formData}
        />
      </EventTableHead>
      <EventTable tableContent={tableContent} />
      <Cards events={eventContent} />
    </div>
  );
}

export default EventList;
