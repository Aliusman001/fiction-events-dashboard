import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import formatDate from "../utils/formatDate";
import formatTo12HourTime from "../utils/formatTo12HourTime";

export default function AlertDialog({ open, handleClose, data }) {
  console.log(data);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="!pt-10">
        <div className="grid sm:space-y-3 space-y-1 md:grid-cols-2 grid-cols-1">
          <h1 className=" font-semibold sm:text-3xl text-2xl text-[#1E232A]">
            {data?.title}
          </h1>
          <span className="md:justify-self-end justify-self-start font-semibold sm:text-base text-[var(--text)] sm:row-start-1 sm:row-end-2 row-start-3 row-end-4 text-xs sm:col-start-2 sm:col-end-3">
            {data?.start && formatDate(data?.start)},{" "}
            {formatTo12HourTime(data?.start)}
          </span>
          <h3 className="sm:text-xl text-base font-normal">
            Category: <span className=" font-semibold">{data?.category}</span>
          </h3>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <h4 className=" sm:text-xl text-base font-normal text-[var(--subHeading)] mb-2">
            Description
          </h4>
          <p
            className=" sm:text-base font-normal text-sm text-[
#9E9E9E]"
          >
            {data?.description}
          </p>
        </DialogContentText>
      </DialogContent>
      <div className="flex items-center justify-center gap-2 p-5 border-t border-[#C6CBD3]">
        <svg
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" sm:w-8 sm:h-8 w-4 h-4"
        >
          <path
            d="M16.4461 2.05566C13.4485 2.0592 10.5747 3.25154 8.45514 5.37114C6.33554 7.49074 5.1432 10.3645 5.13966 13.3621C5.13607 15.8117 5.93623 18.1948 7.41739 20.1459C7.41739 20.1459 7.72575 20.5519 7.77611 20.6105L16.4461 30.8356L25.1201 20.6054C25.1654 20.5509 25.4748 20.1459 25.4748 20.1459L25.4758 20.1428C26.9562 18.1926 27.756 15.8106 27.7525 13.3621C27.7489 10.3645 26.5566 7.49074 24.437 5.37114C22.3174 3.25154 19.4436 2.0592 16.4461 2.05566ZM16.4461 17.4735C15.6329 17.4735 14.838 17.2324 14.1619 16.7806C13.4858 16.3288 12.9588 15.6867 12.6476 14.9354C12.3364 14.1842 12.255 13.3575 12.4136 12.56C12.5723 11.7624 12.9639 11.0299 13.5389 10.4549C14.1138 9.87987 14.8464 9.48829 15.644 9.32965C16.4415 9.17101 17.2682 9.25243 18.0194 9.56362C18.7707 9.8748 19.4128 10.4018 19.8646 11.0779C20.3164 11.754 20.5575 12.5489 20.5575 13.3621C20.5561 14.4521 20.1225 15.497 19.3518 16.2678C18.581 17.0385 17.5361 17.4721 16.4461 17.4735Z"
            fill="#5041BC"
          />
        </svg>

        <span
          className="sm:text-xl text-sm font-normal text-[
var(--text)]"
        >
          {data?.geo?.address?.formatted_address ||
            data?.geo?.address?.locality ||
            data?.geo?.address?.region ||
            data?.geo?.address?.country_code}
        </span>
      </div>
    </Dialog>
  );
}
