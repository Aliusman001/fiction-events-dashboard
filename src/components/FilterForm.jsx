import { memo, useEffect, useState } from "react";
import CommonlyUsedComponents from "../usefullComponents/DateTime";

const catagoryList = [
  "Select Catagory",
  "academic",
  "school-holidays",
  "public-holidays",
  "observances",
  "politics",
  "conferences",
  "expos",
  "concerts",
  "festivals",
  "performing-arts",
  "sports",
  "community",
  "daylight-savings",
  "airport-delays",
  "severe-weather",
  "disasters",
  "terror",
  "health-warnings",
];

export default function FilterForm({ setCategory, setFrom, setTo, formData }) {
  return (
    <form>
      <div>
        <label htmlFor="catagory" className="text-[15px] text-[var(--text)]">
          Category
        </label>
        <br />
        <select
          defaultValue={formData.category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="text-sm font-normal rounded h-8 w-52 p-1 mt-1  border text-[var(--text)] bg-[#EDEDED] border-gray-200"
        >
          {catagoryList.map((v, i) => {
            return (
              <option value={v.startsWith("Select Catagory") ? "" : v} key={i}>
                {v}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <h6 className="text-[15px] text-[var(--text)] mt-4">Date & Time</h6>
        <div className="flex mt-1 gap-2">
          <DateTime
            label={"From"}
            setState={setFrom}
            defaultValue={formData.from}
          />
          <DateTime label={"To"} setState={setTo} defaultValue={formData.to} />
        </div>
      </div>
    </form>
  );
}

const DateTime = memo(function DateTime({ label, setState, defaultValue }) {
  return (
    <div className="flex-grow date">
      <label htmlFor="from" className="text-[#DCDDE0] font-normal text-xs">
        {label}
      </label>
      <br />
      <CommonlyUsedComponents
        defaultValue={defaultValue}
        onAccepts={(v) => {
          setState(new Date(v["$d"]).toISOString());
        }}
      />
    </div>
  );
});
