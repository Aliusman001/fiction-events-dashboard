import { NavLink } from "react-router-dom";
export default function CustomLink({ children, path }) {
  return (
    <NavLink
      to={path}
      className="inline-block group bg-[#e8e7f14d] hover:bg-[#ECEAFF] rounded-full p-3 transition-all"
    >
      {children}
    </NavLink>
  );
}
