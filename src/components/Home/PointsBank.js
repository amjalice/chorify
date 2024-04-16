import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";
const PointsBank = (props) => {
  const authCtx = useContext(AuthContext);

  const removeMemberHandler = (e) => {
    if (
      window.confirm(
        "Are you sure you want to remove this member? Removal will delete all chores related to the member!"
      )
    ) {
      authCtx.onRemoveMember(e.target.id);
    }
  };
  return (
    <div className="members-list-display">
      {authCtx.MembersList.map((member) => (
        <div
          key={Math.random()}
          className={
            member.admin ? "members-list-name admin" : "members-list-name"
          }
        >
          <p className="name-item member-name" key={Math.random()}>
            {member.name}
            {" - "}
            {member.role}
          </p>
          {!member.admin && (
            <button
              className="name-item remove-member-btn"
              id={member.id}
              onClick={removeMemberHandler}
            >
              Remove
            </button>
          )}
          {member.admin && (
            <button className="name-item admin-member-btn" id={member.id}>
              Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PointsBank;
