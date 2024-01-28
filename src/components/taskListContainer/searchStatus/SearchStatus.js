import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../features/projects/projectsSlice";

const SearchStatus = () => {
  const [status, setStatusValue] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="">
      {/* dropdown with status 
    options are all,pending,inProgress,completed
     */}
      <div>
        <select
          value={status}
          onChange={(e) => {
            setStatusValue(e.target.value);
            dispatch(setStatus(e.target.value));
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default SearchStatus;
