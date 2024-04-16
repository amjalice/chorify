import React, { useState, useContext, useRef, Fragment } from "react";

import classes from "./NewMemberModal.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

const AddRewardModal = (props) => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(null);
  const [points, setPoints] = useState("");
  const nameInputRef = useRef();
  const pointsInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.trim().length > 1) {
      setNameIsValid(true);
    } else {
      if (nameIsValid) {
        setNameIsValid(false);
      }
    }
  };

  const validateNameHandler = () => {
    if (name.trim().length > 1) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const pointsChangeHandler = (e) => {
    setPoints(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameIsValid) {
      authCtx.onAddReward(Math.random(), name, points);
      setName("");
      setPoints("");
      props.newRewardHandler();
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else {
      pointsInputRef.current.focus();
    }
  };

  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.newRewardHandler} />
      <div className={"addRewardModal"}>
        <form onSubmit={submitHandler} className="add-reward-form">
          <div className="addRewardFormWrapper">
            <div className="member-cancel-btn" onClick={props.newRewardHandler}>
              X
            </div>
            <h2>New Reward</h2>
            <div className={"new-reward-input"}>
              <label htmlFor="name">Reward</label>
              <input
                ref={nameInputRef}
                id="name"
                label="Reward"
                type="text"
                value={name}
                required
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
              />
              <label htmlFor="points">Points</label>
              <input
                ref={pointsInputRef}
                id="points"
                label="Points"
                type="number"
                min="0"
                max="100000"
                required
                value={points}
                onChange={pointsChangeHandler}
              />
            </div>
          </div>
          <div className={"action-buttons-container"}>
            <Button
              disabled={!name || !points}
              className={"add-reward-form-btn"}
              type="submit"
            >
              Add Reward
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddRewardModal;
