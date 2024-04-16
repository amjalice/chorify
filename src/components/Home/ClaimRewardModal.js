import React, { useState, useContext, useRef, Fragment } from "react";

import classes from "./NewMemberModal.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const ClaimRewardModal = (props) => {
  const authCtx = useContext(AuthContext);
  const members = authCtx.MembersList;
  const [selectMember, setSelectedMember] = useState("default");
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const selectRef = useRef();

  const filterRewards = authCtx.RewardsList.filter(
    (reward) => reward.id.toString() === props.rewardID
  );
  const rewardName = filterRewards[0].name;

  const nameHandler = (e) => {
    if (e.target.value === "default") {
      setSelectedMember("default");
    } else {
      const memberName = e.target.value.substring(
        0,
        e.target.value.indexOf(" ")
      );
      const memberID = e.target.value.substring(
        e.target.value.indexOf(" ") + 1
      );
      setSelectedMember({
        memberName: memberName,
        memberID: memberID,
        rewardName: rewardName,
        rewardPoints: props.rewardPoints,
        rewardID: props.rewardID,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectMember !== "default") {
      authCtx.onClaimReward(selectMember);
      authCtx.onUpdatePoints(
        selectMember.memberID,
        "Subtraction",
        selectMember.rewardPoints
      );
      props.claimRewardHandler();
    } else {
      selectRef.current.focus();
    }
  };

  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.claimRewardHandler} />
      <div className={"claimRewardModal"}>
        <form onSubmit={submitHandler} className="add-reward-form">
          <div className="claimRewardFormWrapper">
            <div
              className="member-cancel-btn"
              onClick={props.claimRewardHandler}
            >
              X
            </div>

            <h2 className="claim-header">Claim {rewardName}</h2>
            <h3 className="claim-points-req">
              {props.rewardPoints}{" "}
              {props.rewardPoints - 0 > 1 ? "points" : "point"} required
            </h3>
            <div className="claim-reward-select">
              <label htmlFor="name-input">Claim For</label>
              <select
                ref={selectRef}
                required
                id="name-input"
                onChange={nameHandler}
              >
                <option value="default">Select Member</option>
                {authCtx.MembersList.map((member) => (
                  <option
                    key={Math.random()}
                    value={member.name + " " + member.id}
                    disabled={member.points < props.rewardPoints ? true : false}
                  >
                    {member.name} - {member.points} pts
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={"action-buttons-container"}>
            <Button
              disabled={selectMember === "default"}
              className={"claim-reward-form-btn"}
              type="submit"
            >
              Claim Reward
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ClaimRewardModal;
