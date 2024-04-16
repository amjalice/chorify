import React, { useState, useContext, Fragment } from "react";
import AuthContext from "../../store/auth-context";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);
  const showTasksHandler = (e) => {
    authCtx.onShowTasks();
    window.scrollTo(0, 0);
  };
  const showPointsHandler = (e) => {
    authCtx.onShowPoints();
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <header className={classes["main-header"]}>
        <div className="header-container">
          <h1>Chorify</h1>
          <Navigation loginHandler={props.loginHandler} />
        </div>
        <div
          className={`header-links ${
            props.showTabs === "off" ? "hide-header-links" : ""
          }`}
        >
          <button
            className={(authCtx.showTasks && "link-btn active") || "link-btn"}
            onClick={showTasksHandler}
          >
            ✅ Tasks
          </button>
          <button
            className={(authCtx.showPoints && "link-btn active") || "link-btn"}
            onClick={showPointsHandler}
          >
            🏆 Points & Rewards
          </button>
        </div>
      </header>
    </Fragment>
  );
};

export default MainHeader;
