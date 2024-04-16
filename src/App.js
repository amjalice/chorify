import React, { useState, useContext, Fragment } from "react";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";

function App() {
  const ctx = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const loginHandler = () => {
    setLogin(!login);
  };
  const registerHandler = () => {
    setRegister(!register);
  };

  const enterHandler = () => {
    ctx.onEnter();
    setLogin(true);
  };

  return (
    <Fragment>
      {!login && !register && (
        <LandingPage
          loginHandler={loginHandler}
          registerHandler={registerHandler}
          enterHandler={enterHandler}
        />
      )}
      {register && (
        <Fragment>
          <MainHeader showTabs="off" />
          <main>
            {!ctx.isRegistered && (
              <div className="login-comp">
                <Registration
                  registerHandler={registerHandler}
                  loginHandler={loginHandler}
                />
              </div>
            )}
          </main>
        </Fragment>
      )}
      {login && (
        <div>
          <MainHeader
            loginHandler={loginHandler}
            showTabs={!ctx.isLoggedIn ? "off" : "on"}
          />
          <main>
            {!ctx.isLoggedIn && (
              <div className="login-comp">
                {" "}
                <Login loginHandler={loginHandler} />{" "}
              </div>
            )}

            {ctx.isLoggedIn && <Home />}
          </main>
        </div>
      )}
    </Fragment>
  );
}

export default App;
