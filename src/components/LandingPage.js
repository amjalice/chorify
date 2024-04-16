import { Fragment } from "react";
import RecesPana from "../photos/tester.png";
import cssFile from "./LandingPage.css";
import Button from "./UI/Button/Button";

const LandingPage = (props) => {
  const registerHandler = (e) => {
    e.preventDefault();
    props.registerHandler();
  };

  const loginHandler = (e) => {
    e.preventDefault();
    props.loginHandler();
  };

  const enterHandler = (e) => {
    e.preventDefault();
    props.enterHandler();
  };

  return (
    <Fragment>
      <div className="landing-flex">
        <div className="landing-container">
          <h1>Chorify</h1>
          <img
            src={RecesPana}
            className={"landing-img"}
            height={400}
            width={700}
            alt="Chorify Family"
          />
          <div className="description-flex">
            <p className="decription">✅ Complete Chores</p>
            <p className="decription">🥇 Earn Points</p>
            <p className="decription">🎁 Redeem Rewards</p>
          </div>
          {/* <Button onClick={registerHandler} className={"register-btn"}>
            Create Family
          </Button>
          <Button onClick={loginHandler} className={"login-btn"}>
            Login
          </Button> */}
          <Button onClick={enterHandler} className={"login-btn enter-btn"}>
            Enter
          </Button>
        </div>
      </div>
      <footer>
        <a className="credit" href="https://storyset.com/">
          App illustrations by Storyset
        </a>
      </footer>
    </Fragment>
  );
};

export default LandingPage;
