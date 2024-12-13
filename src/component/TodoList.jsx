import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuSunMoon } from "react-icons/lu";
import Todos from "../component/Todos";
const TodoList = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="containerMain mx-auto border-[4px] border-red-600 pt-10">
      <h1 className="text-3xl text-black font-extrabold text-center">
        TODO LIST
      </h1>
      <div className="flex justify-between items-center px-4  mt-10">
        <form
          action=""
          className="w-[900px] flex border-[2px] border-slate-400 px-3 rounded-xl "
        >
          <input
            type="text"
            placeholder="Search note"
            className="flex-1 py-3 border-none"
          />
          <button className=" text-2xl">
            <CiSearch />
          </button>
        </form>
        <select className="text-base bg-purple-600 text-white font-medium px-1 py-2 rounded-md shadow hover:bg-purple-700 focus:outline-none ">
          <option value="All" className="text-black">
            All
          </option>
          <option value="Complete" className="text-black">
            Complete
          </option>
          <option value="Incomplete" className="text-black">
            Incomplete
          </option>
        </select>
        <button className="px-4 py-3 bg-purple-700 text-white rounded-md">
          <LuSunMoon />
        </button>
      </div>
      <Todos />
    </div>
  );
};

export default TodoList;
