import React from "react";

const TeamMember = ({ member }) => {
  return (
    <div className="checkbox-container">
      <img src={member.avatar} className="team-avater" alt={member.name} />
      <p className="label">{member.name}</p>
    </div>
  );
};

export default TeamMember;
