import React, { useEffect, useRef, useState } from "react";
import Like from "../usefullComponents/Like";
import getUpcommingEvents from "../api/getUpcommingEvents";
import { useInfiniteQuery } from "@tanstack/react-query";
import formatDate from "../utils/formatDate";
import formatTo12HourTime from "../utils/formatTo12HourTime";
import Error from "../usefullComponents/Error";

function RightSidebar() {
  return (
    <div className="w-full justify-self-end select-none flex flex-col gap-2  md:col-start-3 md:col-end-4 row-start-1 row-end-2 ">
      <UpcomingEvents />
    </div>
  );
}

export default RightSidebar;

function UpcomingEvents() {
  const [mask, setMask] = useState(true);
  const scrollEle = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { data, error, isLoading, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["UpcommingEvents"],
    queryFn: getUpcommingEvents,
    getNextPageParam: (page) => {
      const nextPage = page.next
        ? page.next.split("=")[page.next.split("=").length - 1]
        : null;
      return nextPage;
    },
  });

  useEffect(
    function () {
      const ele = scrollEle.current;
      if (
        ele.scrollHeight <= Math.round(ele.clientHeight + ele.scrollTop + 1)
      ) {
        setMask(false);
      } else {
        setMask(true);
      }
    },
    [scroll]
  );
  return (
    <div className="bg-[var(--lighter)] rounded-2xl p-5 flex-grow h-full md:h-[calc(100vh-350px)] flex flex-col ">
      <h2 className="text-2xl font-normal text-[var(--subHeading)]">
        Upcoming Events
      </h2>
      {error && <Error error={error} refetch={refetch} />}
      <ul
        onScroll={() => {
          const ele = scrollEle.current;
          setScroll(ele.scrollHeight);
          if (
            ele.scrollHeight <= Math.round(ele.clientHeight + ele.scrollTop + 1)
          ) {
            !error && fetchNextPage();
          }
        }}
        ref={scrollEle}
        className={`${
          mask ? "mask" : ""
        } scrollTable  w-full  mt-5 flex-grow  grid md:grid-cols-1 overflow-y-scroll grid-cols-2 gap-2`}
      >
        {isLoading &&
          Array.from({ length: 10 }, (v, i) => {
            return (
              <li
                key={i}
                className="rounded-2xl !bg-[var(--loading)] !animate-pulse h-16 flex border border-[#F3F3F3] md:px-4 px-2 justify-between items-center mr-1 py-2"
              ></li>
            );
          })}
        {data?.pages.length > 0 &&
          data?.pages.map((pages) => {
            return pages.results.map((v, i) => {
              return (
                <li
                  key={i}
                  className="rounded-2xl flex border border-[#F3F3F3] md:px-4 px-2 justify-between items-center mr-1 py-2"
                >
                  <div>
                    <h3 className="md:text-base sm:text-sm text-xs font-semibold text-[var(--subHeading2)]">
                      {v.title}
                    </h3>
                    <span className="text-[var(--text)] font-normal sm:text-xs text-[10px] md:text-sm">
                      {`${formatDate(v.start)}, ${formatTo12HourTime(v.start)}`}
                    </span>
                  </div>
                  <div>
                    <Like
                      className="sm:w-5 sm:h-5 w-[14px] h-[14px]"
                      data={v}
                    />
                  </div>
                </li>
              );
            });
          })}
      </ul>
    </div>
  );
}
