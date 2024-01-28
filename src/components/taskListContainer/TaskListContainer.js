import React from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import SearchStatus from "./searchStatus/SearchStatus";

const TaskListContainer = () => {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <div className="flex items-center justify-between mb-10">
          <AddTask />
          <SearchStatus />
        </div>
        <TaskList />
      </main>
    </div>
  );
};

export default TaskListContainer;
