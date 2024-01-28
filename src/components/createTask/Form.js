import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMembersNameQuery } from "../../features/members/membersApi";
import { useGetProjectsNameQuery } from "../../features/projects/projectsApi";
import { useAddTaskMutation } from "../../features/tasks/tasksApi";

const Form = () => {
  const { data: members, isSuccess: memberIsSuccess } =
    useGetMembersNameQuery();
  const { data: projectName, isSuccess: projectIsSuccess } =
    useGetProjectsNameQuery();

  const [addTask, { isSuccess, isLoading }] = useAddTaskMutation();
  const [taskName, setTaskName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [nameOfProject, setNameOfProject] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !memberName || !nameOfProject || !deadline) return;

    addTask({
      taskName,
      teamMember: memberName,
      project: nameOfProject,
      deadline,
      status: "inProgress",
    });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      {memberIsSuccess && projectIsSuccess && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label htmlFor="lws-taskName">Task Name</label>
            <input
              type="text"
              name="taskName"
              id="lws-taskName"
              required
              placeholder="Implement RTK Query"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div className="fieldContainer">
            <label>Assign To</label>
            <select
              name="teamMember"
              id="lws-teamMember"
              required
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            >
              <option value="" hidden>
                Select Job
              </option>
              {members?.payload?.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="fieldContainer">
            <label htmlFor="lws-projectName">Project Name</label>
            <select
              id="lws-projectName"
              name="projectName"
              required
              value={nameOfProject}
              onChange={(e) => setNameOfProject(e.target.value)}
            >
              <option value="" hidden>
                Select Project
              </option>
              {projectName?.payload?.map((name) => (
                <option key={name._id} value={name._id}>
                  {name.projectName}
                </option>
              ))}
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="lws-deadline"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button type="submit" className="lws-submit" disabled={isLoading}>
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
