import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="containerMain mx-auto">
      <ul className="bg-orange-700 text-orange-950 flex justify-center items-center gap-6">
        <li className="text-yellow-950">
          <NavLink to={"/todoList"}>Todo</NavLink>
        </li>
        <li className="text-yellow-950">
          <NavLink to={"users"}>Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
