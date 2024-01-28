import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchName } from "../../features/projects/projectsSlice";

const Navbar = () => {
  const { jobName } = useSelector((state) => state.projects);

  const [name, setName] = useState(jobName);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchName(name));
  };
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link href="./index.html" to={"/"}>
          <h2 className="font-bold text-3xl">Task Manager</h2>
        </Link>
        <form
          onSubmit={handleSearch}
          onBlur={handleSearch}
          className="flex-1 max-w-xs search-field group"
        >
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input text-gray-800"
            id="lws-searchTask"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
