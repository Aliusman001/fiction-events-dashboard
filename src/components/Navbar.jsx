import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="h-20 bg-[var(--lighter)] md:px-10 px-5 flex items-center gap-0  md:justify-start justify-between md:gap-10 relative">
      <NavLink to="/">
        <img src="/logo.svg" alt="logo" />
      </NavLink>
      <div className="relative md:w-[576px] w-[200px]">
        <img
          src="/Search.svg"
          alt="logo"
          width={"24px"}
          className="absolute top-1/2 -translate-y-1/2 left-4"
        />
        <input
          type="text"
          className="h-12 rounded-full w-full  bg-[var(--input)] text-[var(--subHeading2)] text-sm font-normal pl-12"
          placeholder="Search events..."
        />
      </div>
      <div className="md:hidden block">
        <button onClick={() => setOpen((c) => !c)}>
          <img src="/burger.svg" alt="burger button" />
        </button>
      </div>
      {open && (
        <>
          <div className="md:hidden fixed bg-[var(--primary)] top-0 bottom-0 left-0 right-0 z-50">
            <div className=" w-full flex px-5 py-4 justify-between items-center">
              <img src="/logo.svg" />
              <button onClick={() => setOpen((c) => !c)}>
                <img src="/close.svg" alt="" srcset="" />
              </button>
            </div>
            <ul className="px-5 nav mt-10 flex gap-5 flex-col">
              {["Dashboard", "Favorite Events"].map((v, i) => {
                return (
                  <li className="border-b text-center  text-white border-b-white pb-2">
                    <NavLink
                      to={v === "Dashboard" ? "/" : "/favorite"}
                      className="text-2xl font-semibold hover:text-gray-200"
                      onClick={() => setOpen(false)}
                    >
                      {v}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
