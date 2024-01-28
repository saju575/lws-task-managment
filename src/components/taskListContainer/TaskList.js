import Pagination from "@mui/material/Pagination";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/projects/projectsSlice";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Task from "./Task";

const TaskList = () => {
  const { list, jobName, page, status } = useSelector(
    (state) => state.projects
  );
  const dispatch = useDispatch();
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useGetTasksQuery(
    { projectsName: list, searchField: jobName, page, status }
    // { refetchOnMountOrArgChange: true }
  );

  //decide what to rander
  let content = null;
  if (isLoading) {
    content = <div>Loadding...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (!isLoading && !isError && tasks?.payload?.data?.length === 0) {
    content = <div>No Job found !</div>;
  } else if (
    !isLoading &&
    !isError &&
    tasks?.payload?.data?.length > 0 &&
    list.length === 0
  ) {
    content = <div>No Job found !</div>;
  } else if (!isLoading && !isError && tasks?.payload?.data?.length > 0) {
    content = tasks?.payload?.data?.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
  return (
    <div className="lws-task-list">
      {content}
      <div className="flex justify-end" style={{ marginTop: "40px" }}>
        <Pagination
          count={tasks?.payload?.totalPages}
          onChange={(_, val) => {
            dispatch(setPage(val));
          }}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default TaskList;
