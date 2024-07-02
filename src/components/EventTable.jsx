import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import Like from "../usefullComponents/Like";
import { memo, useEffect, useRef, useState } from "react";
import AlertDialog from "../usefullComponents/AlertDialog";
import formatTo12HourTime from "../utils/formatTo12HourTime";
import LoadingTableRow from "../usefullComponents/LoadingTableRow";
import formatDate from "../utils/formatDate";
import Error from "../usefullComponents/Error";

const style = {
  "& .MuiTableRow-root td:first-of-type": {
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  "& .MuiTableRow-root td:last-of-type": {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
};

function EventTable({ tableContent }) {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(false);
  const [data, setData] = useState({});

  const scrollElement = useRef(null);

  const handleClickOpen = (v) => {
    setOpen(true);
    setData(v);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const TableCustom = styled(Table)(({ theme }) => ({
    width: "100%",
    paddingRight: "10px",
    fontFamily: "Inter",
    ["@media (max-width:875px)"]: {
      width: "850px",
    },
  }));
  const TableCellCustom = styled(TableCell)(({ theme }) => ({
    backgroundColor: "#d9d9d9",
    padding: "5px 15px",
    borderBottom: "1px solid rgb(173, 173, 173)",
  }));

  useEffect(() => {
    if (sort) {
      if (tableContent && tableContent.events) {
        const updatedEvents = {
          ...tableContent.events,
          pages: tableContent.events.pages?.map((page) => {
            return {
              ...page,
              results: page.results.sort(
                (a, b) => new Date(a.start) - new Date(b.start)
              ),
            };
          }),
        };
        tableContent.setEvents({ ...updatedEvents });
      }
    } else {
      if (tableContent && tableContent.events) {
        const updatedEvents = {
          ...tableContent.events,
          pages: tableContent.events.pages?.map((page) => {
            return {
              ...page,
              results: page.results.sort(
                (a, b) => new Date(b.start) - new Date(a.start)
              ),
            };
          }),
        };
        tableContent.setEvents({ ...updatedEvents });
      }
    }
  }, [sort]);

  useEffect(() => {
    const handleScroll = (event) => {
      const ele = event.target;
      if (
        ele.scrollHeight <= Math.round(ele.clientHeight + ele.scrollTop + 1)
      ) {
        if (!tableContent?.error) {
          tableContent.fetchNextPage();
        }
      }
    };
    const tableContainer = scrollElement.current;
    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [tableContent.error]);
  return (
    <>
      <TableContainer
        ref={scrollElement}
        className="mt-2 scroll !select-none h-80 md:h-[calc(100vh-270px)] scrollTable bg-[var(--light)]"
      >
        <TableCustom
          stickyHeader
          className="!border-separate !border-spacing-x-0 !border-spacing-y-4"
        >
          <TableHead>
            <TableRow>
              {["#", "Name", "Time", "Date", "Location", ""].map((v, i) => {
                return (
                  <TableCellCustom
                    key={i}
                    className="!text-[var(--tableHeading)] !bg-[#f5f4fd]"
                  >
                    {i === 0 ? (
                      <div
                        onClick={() => {
                          setSort((c) => !c);
                        }}
                        className="!flex items-center gap-2 cursor-pointer"
                      >
                        <span className="uppercase font-semibold">{v}</span>
                        <img
                          src="arrow.svg"
                          alt="arrow.svg"
                          className="w-5 h-5"
                        />
                      </div>
                    ) : (
                      <div className="!flex items-center gap-2 cursor-pointer">
                        <span className="uppercase font-semibold">{v}</span>
                      </div>
                    )}
                  </TableCellCustom>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody className="w-full" sx={style}>
            {/* LOADING */}
            {tableContent?.isLoading &&
              Array.from({ length: 10 }, (v, i) => {
                return <LoadingTableRow key={i} />;
              })}
            {/* EVENT-LIST */}
            {tableContent?.events?.pages?.length > 0 &&
              tableContent.events?.pages.map((page, pageNum) => {
                return page.results.map((v, i) => {
                  return (
                    <TableRow
                      key={i}
                      className="!bg-[var(--box)]"
                      onClick={() => handleClickOpen(v)}
                    >
                      <TableCell className="!text-[var(--secondary)] !text-base !font-extrabold ">
                        {`${Number(`${pageNum}0`) + (i + 1)}`.padStart(2, 0)}
                      </TableCell>
                      <TableCell className="!text-[var(--text)] !font-bold">
                        {v.title}
                      </TableCell>
                      <TableCell className="!text-[var(--text)] !font-bold">
                        {formatTo12HourTime(v.start)}
                      </TableCell>
                      <TableCell className="!text-[var(--text)] !font-bold">
                        {formatDate(v.start)}
                      </TableCell>
                      <TableCell className="!text-[var(--text)] !font-medium">
                        {v.geo.address.formatted_address ||
                          v.geo.address.locality ||
                          v.geo.address.region ||
                          v.geo.address.country_code}
                      </TableCell>
                      <TableCell>
                        <Like data={v} />
                      </TableCell>
                    </TableRow>
                  );
                });
              })}
            {/* IS-FETCHING-NEXT-PAGE */}
            {tableContent?.isFetchingNextPage &&
              Array.from({ length: 10 }, (v, i) => {
                return <LoadingTableRow key={i} />;
              })}
          </TableBody>
        </TableCustom>
        {/* ERROR */}
        {tableContent?.error && (
          <Error error={tableContent.error} refetch={tableContent.refetch} />
        )}
      </TableContainer>
      <AlertDialog open={open} data={data} handleClose={handleClose} />
    </>
  );
}

export default memo(EventTable);
