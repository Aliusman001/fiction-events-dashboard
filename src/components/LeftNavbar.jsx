import React from "react";
import CustomLink from "../usefullComponents/CustomLink";
import LikeSvg from "../svg/LikeSvg";
import GridSvg from "../svg/GridSvg";

function LeftNavbar({ className }) {
  return (
    <div
      className={`${className}  leftnavbar h-full md:flex hidden w-20 rounded-[40px] bg-[var(--lighter)] items-start pt-5 justify-center`}
    >
      <ul className="flex flex-col gap-1">
        <li>
          <CustomLink path="/">
            <GridSvg />
          </CustomLink>
        </li>
        <li>
          <CustomLink path="/favorite">
            <LikeSvg />
          </CustomLink>
        </li>
      </ul>
    </div>
  );
}

export default LeftNavbar;
