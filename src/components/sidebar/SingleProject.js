import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../features/projects/projectsSlice";

const SingleProject = ({ project }) => {
  const { focus, isAdded, colorClass } = project || {};
  const [check, setCheck] = useState(isAdded);
  const dispatch = useDispatch();

  return (
    <div className="checkbox-container">
      <input
        id={focus}
        type="checkbox"
        className={colorClass}
        checked={check}
        onChange={(e) => {
          setCheck(e.target.checked);
          dispatch(
            updateProject({ focus, isAdded: e.target.checked, colorClass })
          );
        }}
      />
      <label htmlFor={focus} className="label">
        {focus}
      </label>
    </div>
  );
};

export default SingleProject;
