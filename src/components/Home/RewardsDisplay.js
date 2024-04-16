import { Fragment, useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import AddRewardModal from "./AddRewardsModal";
import ClaimRewardModal from "./ClaimRewardModal";
import Gift from "../../photos/Gift.png";
import Claimed from "../../photos/Claimed.png";

const RewardsDisplay = () => {
  const authCtx = useContext(AuthContext);
  const rewards = authCtx.RewardsList;
  const claimed = authCtx.ClaimedList;
  const [showOpenRewards, setShowOpenRewards] = useState(true);
  const [showClaimedRewards, setShowClaimedRewards] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const showOpenRewardsHandler = () => {
    setShowOpenRewards(true);
    setShowClaimedRewards(false);
  };
  const showClaimedRewardsHandler = () => {
    setShowClaimedRewards(true);
    setShowOpenRewards(false);
  };
  const newRewardHandler = () => {
    setShowRewardsModal(!showRewardsModal);
  };

  const [rewardID, setRewardID] = useState("");
  const [rewardPoints, setPoints] = useState("");

  const claimRewardHandler = (e) => {
    if (!showClaimModal) {
      setRewardID(e.target.id);
      setPoints(e.target.value);
    }
    setShowClaimModal(!showClaimModal);
  };

  return (
    <Fragment>
      {showRewardsModal && (
        <AddRewardModal newRewardHandler={newRewardHandler} />
      )}
      {showClaimModal && (
        <ClaimRewardModal
          claimRewardHandler={claimRewardHandler}
          rewardID={rewardID}
          rewardPoints={rewardPoints}
        />
      )}

      <div className="rewards-display">
        <div className="rewards-header">
          <h2>✨ Rewards ✨</h2>
          <button
            type="button"
            className="add-reward-btn"
            onClick={newRewardHandler}
          >
            <svg
              className="rewards-plus"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4,11H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3a1,1,0,0,1,0,2Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="rewards-container">
        <div className="rewards-tab">
          <button
            type="button"
            className={
              showOpenRewards
                ? "open-rewards-tab active-tab"
                : "open-rewards-tab"
            }
            onClick={showOpenRewardsHandler}
          >
            🎁 Rewards
          </button>
          <button
            type="button"
            className={
              showClaimedRewards
                ? "claimed-rewards-tab active-tab"
                : "claimed-rewards-tab"
            }
            onClick={showClaimedRewardsHandler}
          >
            🥳 Claimed
          </button>
        </div>
        {showOpenRewards && rewards.length > 0 && (
          <div className="open-rewards-display">
            {rewards.map((reward) => (
              <div key={Math.random()} className="rewards-item">
                <p className="reward-name">{reward.name}</p>
                <div className="points-claim-container">
                  <p className="reward-points">
                    {reward.points} {reward.points - 0 > 1 ? "pts" : "pt"}
                  </p>
                  <button
                    type="button"
                    id={reward.id}
                    value={reward.points}
                    className="claim-reward-btn"
                    onClick={claimRewardHandler}
                  >
                    Claim!
                  </button>
                </div>
              </div>
            ))}
            <img
              src={Gift}
              className={"no-to-do gift"}
              height={500}
              width={700}
              alt="Claim Your Rewards!"
              loading="lazy"
            />
          </div>
        )}
        {showOpenRewards && rewards.length === 0 && (
          <div className="claimed-rewards-display">
            <p className="no-rewards-msg">
              No rewards available to be claimed 😿
            </p>
          </div>
        )}
        {showClaimedRewards && claimed.length > 0 && (
          <Fragment>
            <div className="claimed-rewards-display">
              {claimed.map((x) => (
                <div key={Math.random()} className="claimed-item">
                  <p className="reward-name">
                    {x.name} ({x.points} {x.points - 0 > 1 ? "pts" : "pt"})
                  </p>
                  <p className="claimed-by">🎉 {x.memberName}</p>
                </div>
              ))}
            </div>
            <img
              src={Claimed}
              className={"no-to-do claimed-photo"}
              height={500}
              width={700}
              alt="Claimed Rewards!"
              loading="lazy"
            />
          </Fragment>
        )}
        {showClaimedRewards && claimed.length === 0 && (
          <div className="claimed-rewards-display">
            <p className="no-claimed-msg">
              No rewards have been claimed yet 🙀
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RewardsDisplay;
