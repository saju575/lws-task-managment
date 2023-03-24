import React from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Task from "./Task";

const TaskList = () => {
  const { list, jobName } = useSelector((state) => state.projects);
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  //decide what to rander
  let content = null;
  if (isLoading) {
    content = <div>Loadding...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (!isLoading && !isError && tasks.length === 0) {
    content = <div>No Job found !</div>;
  } else if (!isLoading && !isError && tasks.length > 0 && list.length > 0) {
    let myArrayFiltered = tasks
      .filter((task) => {
        if (jobName) {
          return task.taskName.toLowerCase().includes(jobName.toLowerCase());
        }
        return true;
      })
      .filter((el) => {
        return list.some((f) => {
          return f.focus === el.project.projectName && f.isAdded === true;
        });
      });

    if (myArrayFiltered.length === 0) {
      content = <div>No Job found !</div>;
    } else {
      content = myArrayFiltered.map((task) => (
        <Task key={task.id} task={task} />
      ));
    }
  }
  return <div className="lws-task-list">{content}</div>;
};

export default TaskList;
