import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import formatTo12HourTime from "../utils/formatTo12HourTime";
import formatDate from "../utils/formatDate";
import Like from "../usefullComponents/Like";
import { favorite } from "../store/dataReducer";
import { useEffect, useState } from "react";
import AlertDialog from "../usefullComponents/AlertDialog";

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

function FavoriteTable() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  // const [sort, setSort] = useState(false);

  const dispatch = useDispatch();
  const favoriteArray = useSelector((store) => store.data.favorite);
  useEffect(function () {
    const favoriteList = JSON.parse(localStorage.getItem("favorite"));
    if (favoriteArray.length === 0 && favoriteList?.length > 0) {
      dispatch(favorite(favoriteList));
    }
  }, []);
  const handleClickOpen = (v) => {
    setOpen(true);
    setData(v);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   if (sort) {
  //     if (tableContent && tableContent.events) {
  //       const updatedEvents = {
  //         ...tableContent.events,
  //         pages: tableContent.events.pages?.map((page) => {
  //           return {
  //             ...page,
  //             results: page.results.sort(
  //               (a, b) => new Date(a.start) - new Date(b.start)
  //             ),
  //           };
  //         }),
  //       };
  //       tableContent.setEvents({ ...updatedEvents });
  //     }
  //   } else {
  //     if (tableContent && tableContent.events) {
  //       const updatedEvents = {
  //         ...tableContent.events,
  //         pages: tableContent.events.pages?.map((page) => {
  //           return {
  //             ...page,
  //             results: page.results.sort(
  //               (a, b) => new Date(b.start) - new Date(a.start)
  //             ),
  //           };
  //         }),
  //       };
  //       tableContent.setEvents({ ...updatedEvents });
  //     }
  //   }
  // }, [sort]);

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

  return (
    <div>
      <h1 className="text-xl font-semibold ">Favorite</h1>
      <TableContainer className="mt-2 scroll !select-none h-[calc(100vh-160px)] scrollTable bg-[var(--light)]">
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
                          // setSort((c) => !c);
                        }}
                        className="!flex items-center gap-2 cursor-pointer"
                      >
                        <span className="uppercase font-semibold">{v}</span>
                        {/* <img src="arrow.svg" alt="arrow.svg" /> */}
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
            {favoriteArray?.length > 0 &&
              favoriteArray.map((v, i) => {
                return (
                  <TableRow
                    onClick={() => handleClickOpen(v)}
                    key={i}
                    className="!bg-[var(--box)]"
                  >
                    <TableCell className="!text-[var(--secondary)] !text-base !font-extrabold ">
                      {`${i + 1}`.padStart(2, 0)}
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
              })}
          </TableBody>
        </TableCustom>
      </TableContainer>
      <AlertDialog open={open} data={data} handleClose={handleClose} />
    </div>
  );
}

export default FavoriteTable;
