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
    id,
  } = task;
  const { data: members, isSuccess: memberIsSuccess } =
    useGetMembersNameQuery();
  const { data: projectName, isSuccess: projectIsSuccess } =
    useGetProjectsNameQuery();

  const [updateTask, { isSuccess, isLoading }] = useUpdateTaskMutation();
  const [taskName, setTaskName] = useState(nameOfTask);
  const [memberName, setMemberName] = useState(teamMember.name);
  const [nameOfProject, setNameOfProject] = useState(project.projectName);
  const [deadline, setDeadline] = useState(time);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const member = members.find((m) => m.name === memberName);
    const project = projectName.find((p) => p.projectName === nameOfProject);
    updateTask({
      id,
      data: {
        taskName,
        teamMember: member,
        project,
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
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            >
              <option value="" hidden>
                Select Job
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.name}>
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
              {projectName.map((name) => (
                <option key={name.id} value={name.projectName}>
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
