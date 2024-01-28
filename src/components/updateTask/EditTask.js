import React from "react";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "../../features/tasks/tasksApi";
import Form from "./Form";

const EditTask = () => {
  const { taskId } = useParams();
  const { data: task, isSuccess } = useGetTaskQuery(taskId);
  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Update Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        {isSuccess && task?.payload && <Form task={task.payload} />}
      </div>
    </main>
  );
};

export default EditTask;
