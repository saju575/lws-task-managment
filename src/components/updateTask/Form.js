import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMembersNameQuery } from "../../features/members/membersApi";
import { useGetProjectsNameQuery } from "../../features/projects/projectsApi";
import { useUpdateTaskMutation } from "../../features/tasks/tasksApi";

const Form = ({ task }) => {
  const {
    taskName: nameOfTask,
    teamMember,
    project,
    deadline: time,
    _id,
  } = task;
  const { data: members, isSuccess: memberIsSuccess } =
    useGetMembersNameQuery();
  const { data: projectName, isSuccess: projectIsSuccess } =
    useGetProjectsNameQuery();

  const [updateTask, { isSuccess, isLoading }] = useUpdateTaskMutation();
  const [taskName, setTaskName] = useState(nameOfTask);
  const [memberId, setMemberId] = useState(teamMember._id);
  const [idOfProject, setIdOfProject] = useState(project._id);
  const [deadline, setDeadline] = useState(time);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !memberId || !idOfProject || !deadline) return;

    updateTask({
      id: _id,
      data: {
        taskName,
        teamMember: memberId,
        project: idOfProject,
        deadline,
      },
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
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
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
              value={idOfProject}
              onChange={(e) => setIdOfProject(e.target.value)}
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
