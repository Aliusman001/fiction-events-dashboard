import { useEffect, useRef, useState } from "react";

export default function EventTableHead({ children }) {
  const [open, setOpen] = useState(false);
  const filterComp = useRef(null);

  function handlefilter(e) {
    if (e.target.closest(".css-1anqmj6-MuiPopper-root-MuiPickersPopper-root")) {
      return;
    }
    if (!filterComp.current?.contains(e.target)) {
      setOpen(false);
    }
  }
  useEffect(function () {
    document.addEventListener("click", handlefilter);
    return () => {
      document.removeEventListener("click", handlefilter);
    };
  }, []);
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-semibold ">Events List</h1>
      <div className="relative">
        <button
          onClick={(e) => {
            setOpen((c) => !c);
            e.stopPropagation();
          }}
          type="button"
          className="bg-white shadow-lg w-10 h-10 shadow-[#9995bd]  border border-[#E2DFF8] rounded-md p-2"
        >
          <img src="/filter.svg" alt="filter button" />
        </button>
        {open && (
          <div
            ref={filterComp}
            className="absolute top-16 bg-[var(--lighter)]  p-5 z-10 right-0 sm:w-96 w-[300px] shadow-[#9995bd] shadow-lg rounded-xl"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
