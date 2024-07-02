import EventList from "./EventList";
import LeftNavbar from "./LeftNavbar";
import RightSidebar from "./RightSidebar";
import EventOfMonth from "./EventOfMonth";

function Grid() {
  return (
    <div className="md:px-7 px-2 gap-5  bg-[var(--body)] py-5 grid md:grid-cols-[80px,3fr,380px] md:grid-rows-[2fr,209px]  min-h-[calc(100vh-80px)] grid-cols-1 grid-rows-[200px,1fr,209px]">
      <LeftNavbar className="row-span-2" />
      <EventList />
      <RightSidebar />
      <EventOfMonth />
    </div>
  );
}

export default Grid;
