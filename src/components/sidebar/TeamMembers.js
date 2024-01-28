import React from "react";
import { useGetMembersNameQuery } from "../../features/members/membersApi";
import TeamMember from "./TeamMember";

const TeamMembers = () => {
  const { data: members, isLoading, isError, error } = useGetMembersNameQuery();
  //decide what to rander
  let content = null;
  if (isLoading) {
    content = <div>Loadding...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (!isLoading && !isError && members?.payload?.length === 0) {
    content = <div>No member name found !</div>;
  } else if (!isLoading && !isError && members?.payload?.length > 0) {
    content = members?.payload?.map((member) => (
      <TeamMember key={member._id} member={member} />
    ));
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMembers;
