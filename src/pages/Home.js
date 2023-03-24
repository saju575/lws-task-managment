import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import TaskListContainer from "../components/taskListContainer/TaskListContainer";

const Home = () => {
  return (
    <>
      <div className="container relative">
        <Sidebar />
        <TaskListContainer />
      </div>
    </>
  );
};

export default Home;
