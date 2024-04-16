import React, { useState, useContext, useRef, Fragment } from "react";

import classes from "./NewMemberModal.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";
import PointsBank from "./PointsBank";

let firstRun = true;

const NewMemberModal = (props) => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(null);
  const [role, setRole] = useState("");
  const [roleIsValid, setRoleIsValid] = useState(null);
  const nameInputRef = useRef();
  const roleInputRef = useRef();
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

  const roleChangeHandler = (e) => {
    setRole(e.target.value);
    if (e.target.value.trim().length > 2) {
      setRoleIsValid(true);
    } else {
      if (roleIsValid) {
        setRoleIsValid(false);
      }
    }
  };

  const validateRoleHandler = () => {
    if (role.trim().length > 2) {
      setRoleIsValid(true);
    } else {
      setRoleIsValid(false);
    }
  };

  const [hideInput, setHideInput] = useState(true);

  const hideInputHandler = () => {
    setHideInput(!hideInput);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameIsValid && roleIsValid) {
      authCtx.onAddMember(name, role);
      setName("");
      setRole("");
      hideInputHandler();
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else {
      roleInputRef.current.focus();
    }
  };

  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.newMemberHandler} />
      <Card className={classes.modal}>
        <div
          className="member-cancel-btn modal-cancel"
          onClick={props.newMemberHandler}
        >
          X
        </div>
        <h2>Manage Members</h2>
        <PointsBank members={authCtx.MembersList} />
        <form
          onSubmit={submitHandler}
          className={`${hideInput ? "" : "add-member-form"}`}
        >
          <div className={`${hideInput ? "hide-input" : "new-member-input"}`}>
            <h4>New Member</h4>
            <label htmlFor="name">Name</label>
            <input
              ref={nameInputRef}
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={nameChangeHandler}
              onBlur={validateNameHandler}
              className={`${hideInput ? "hide-input" : ""} ${
                nameIsValid === false ? "invalid" : ""
              }`}
            />
            <label htmlFor="role">Role</label>
            <input
              ref={roleInputRef}
              id="role"
              label="Role"
              type="text"
              value={role}
              placeholder="mother, son, roommate.."
              onChange={roleChangeHandler}
              onBlur={validateRoleHandler}
              className={`${hideInput ? "hide-input" : ""} ${
                roleIsValid === false ? "invalid" : ""
              }`}
            />
          </div>
          <div className={"action-buttons-container"}>
            {hideInput && (
              <Button
                className={"add-member-btn"}
                type="button"
                onClick={hideInputHandler}
              >
                New Member
              </Button>
            )}
            {!hideInput && (
              <Fragment>
                <Button onClick={hideInputHandler} className={"back-btn"}>
                  Cancel
                </Button>
                <Button
                  disabled={!nameIsValid || !roleIsValid}
                  className={"add-member-btn submit-add-member-btn"}
                  type="submit"
                >
                  Add Member
                </Button>
              </Fragment>
            )}
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default NewMemberModal;
