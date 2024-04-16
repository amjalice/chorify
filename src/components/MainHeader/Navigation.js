import React, { useContext, useState } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";
import Button from "../UI/Button/Button";
import cssFile from "../LandingPage.css";
import NewMemberModal from "../Home/NewMemberModal";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  const logoutHandler = (e) => {
    e.preventDefault();
    props.loginHandler();
    ctx.onLogout();
  };

  const [showMemberModal, setShowMemberModal] = useState(false);
  const newMemberHandler = () => {
    setShowMemberModal(!showMemberModal);
  };

  return (
    <nav className={classes.nav}>
      {showMemberModal && (
        <NewMemberModal newMemberHandler={newMemberHandler} />
      )}
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <Button
              type="button"
              onClick={newMemberHandler}
              className={"new-member-btn"}
            >
              Members
            </Button>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Button
              type="button"
              onClick={logoutHandler}
              className={"logout-btn"}
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
