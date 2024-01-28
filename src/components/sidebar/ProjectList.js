import React from "react";
import { useSelector } from "react-redux";
import { useGetProjectsNameQuery } from "../../features/projects/projectsApi";
import SingleProject from "./SingleProject";

const ProjectList = () => {
  const {
    data: projectNames,
    isLoading,
    isError,
    error,
  } = useGetProjectsNameQuery();

  const { list } = useSelector((state) => state.projects);

  //decide what to rander
  // let content = null;
  // if (isLoading) {
  //   content = <div>Loadding...</div>;
  // } else if (!isLoading && isError) {
  //   content = <div>{error.message}</div>;
  // } else if (!isLoading && !isError && projectNames.length === 0) {
  //   content = <div>No project name found !</div>;
  // } else if (!isLoading && !isError && projectNames.length > 0) {
  //   content = projectNames.map((project) => (
  //     <SingleProject key={project.id} project={project} />
  //   ));
  // }

  let content = null;
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!isLoading && list.length > 0) {
    content = list.map((project, index) => (
      <SingleProject key={index} project={project} />
    ));
  }
  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectList;
