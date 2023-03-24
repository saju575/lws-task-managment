import React from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const TaskListContainer = () => {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <AddTask />

        <TaskList />
      </main>
    </div>
  );
};

export default TaskListContainer;
