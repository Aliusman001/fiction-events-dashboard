import React from "react";
import LeftNavbar from "../components/LeftNavbar";
import EventList from "../components/EventList";
import FavoriteTable from "../components/FavoriteTable";

function FavoritePage() {
  return (
    <div className="md:px-7 px-2 gap-5  bg-[var(--body)] py-5 grid md:grid-cols-[80px,1fr]   min-h-[calc(100vh-80px)] grid-cols-1">
      <LeftNavbar />

      <FavoriteTable />

      {/* <div className="bg-red-500">sss</div> */}
    </div>
  );
}

export default FavoritePage;
