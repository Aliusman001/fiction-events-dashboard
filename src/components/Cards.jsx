import { useDispatch, useSelector } from "react-redux";
import EventCard from "../usefullComponents/EventCards";
import formatNumber from "../utils/formatNumber";
import { useQuery } from "@tanstack/react-query";
import getMounthEvents from "../api/getMonthEvents";
import { CircularProgress } from "@mui/material";
import { memo } from "react";
import { useEffect } from "react";
import { favorite as favoriteAction } from "../store/dataReducer";

function Cards({ events }) {
  return (
    <div className="flex items-center gap-2 mt-5">
      <TotalEvents isLoading={events.isLoading} events={events.events} />
      <MonthEvent />
      <FavoriteCount />
    </div>
  );
}
const MonthEvent = memo(function MonthEvent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["This Month Events"],
    queryFn: getMounthEvents,
  });
  const content = {
    head: "This Month Events",
    body: isLoading ? (
      <CircularProgress size={20} />
    ) : (
      formatNumber(data?.count)
    ),
  };
  return <EventCard content={content} />;
});

const TotalEvents = memo(function ({ events, isLoading }) {
  const content = {
    head: "All Events",
    body: isLoading ? (
      <CircularProgress size={20} />
    ) : (
      formatNumber(events?.pages?.[0]?.count)
    ),
  };
  return <EventCard content={content} />;
});

const FavoriteCount = memo(function () {
  const dispatch = useDispatch();
  const favorite = useSelector((store) => store.data.favorite);
  const content = {
    head: "Favorite Events",
    body: favorite.length,
  };
  useEffect(function () {
    const favoriteList = JSON.parse(localStorage.getItem("favorite"));
    if (favorite.length === 0 && favoriteList?.length > 0) {
      dispatch(favoriteAction(favoriteList));
    }
  }, []);

  return <EventCard content={content} />;
});

export default memo(Cards);
