import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Winners from "../../photos/Winners.png";

const PointsTotal = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <div className="pointsbank-display">
        <h2>🏅 Points Bank 🏅</h2>
        <div className="pointsbank-container">
          <img
            src={Winners}
            className={"no-to-do winners"}
            height={300}
            width={300}
            alt="Points Winners Podium"
            loading="lazy"
          />
          <div className="memberpoints-display">
            {authCtx.MembersList.map((member) => {
              return (
                <div key={Math.random()} className="points-member-container">
                  <div className="member-name points-bank-name">
                    {member.name}
                  </div>
                  <div className="member-points">{member.points}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PointsTotal;
