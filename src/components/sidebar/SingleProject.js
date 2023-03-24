import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../features/projects/projectsSlice";

const SingleProject = ({ project }) => {
  const { projectName, colorClass } = project || {};
  const [check, setCheck] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="checkbox-container">
      <input
        id={projectName}
        type="checkbox"
        className={colorClass}
        checked={check}
        onChange={(e) => {
          setCheck(e.target.checked);
          dispatch(
            updateProject({ focus: projectName, isAdded: e.target.checked })
          );
        }}
      />
      <label htmlFor={projectName} className="label">
        {projectName}
      </label>
    </div>
  );
};

export default SingleProject;
