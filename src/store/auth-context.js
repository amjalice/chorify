import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  showTasks: true,
  showPoints: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onEnter: () => {},
  onShowTasks: () => {},
  onShowPoints: () => {},
  onRegister: (name, email, password, role, familyName, familyPassword) => {},
  onAddMember: (name, role) => {},
  onRemoveMember: (id) => {},
  onUpdatePoints: (id, operation, points) => {},
  onAddReward: (id, name, points) => {},
  onClaimReward: (data) => {},
  MembersList: [],
  BlackList: [],
  RewardsList: [],
  ClaimedList: [],
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showTasks, setShowTasks] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const [members, setMembers] = useState([
    {
      id: Math.random(),
      name: "Alice",
      role: "Mom",
      points: 50,
      admin: true,
    },
    {
      id: Math.random(),
      name: "Joe",
      role: "Dad",
      points: 35,
      admin: false,
    },
    {
      id: Math.random(),
      name: "Jojo",
      role: "Daughter",
      points: 320,
      admin: false,
    },
    {
      id: Math.random(),
      name: "Billy",
      role: "Son",
      points: 250,
      admin: false,
    },
  ]);
  const [rewards, setRewards] = useState([
    { id: Math.random(), name: "PS5", points: "1000" },
    { id: Math.random(), name: "Barbie", points: "200" },
    { id: Math.random(), name: "$20", points: "40" },
  ]);
  const [claimed, setClaimed] = useState([
    { name: "Nando's Meal", points: "40", memberName: "Billy" },
    { name: "Mystery Gift-Card", points: "100", memberName: "Alice" },
  ]);

  const [blacklist, setBlackList] = useState([]);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const enterHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const registerHandler = (
    name,
    email,
    password,
    role,
    familyName,
    familyPassword
  ) => {
    setIsRegistered(true);
    loginHandler();
  };

  const addMemberHandler = (name, role) => {
    const memberObject = {
      id: Math.random(),
      name: name,
      role: role,
      points: 0,
    };
    setMembers((prevState) => {
      return [...prevState, memberObject];
    });
  };

  const removeMemberHandler = (id) => {
    const filteredMembersList = members.filter(
      (member) => member.id.toString() !== id.toString()
    );

    setMembers([...filteredMembersList]);
    setBlackList((prevState) => {
      return [...prevState, id.toString()];
    });
  };

  const showPointsHandler = () => {
    setShowPoints(true);
    setShowTasks(false);
  };

  const showTasksHandler = () => {
    setShowPoints(false);
    setShowTasks(true);
  };

  const updatePointsHandler = (id, operation, points) => {
    const membersCopy = members.map((x) => x);

    let index = membersCopy.findIndex((x) => x.id.toString() === id.toString());

    if (index !== -1) {
      if (operation === "ADD") {
        membersCopy[index].points += points - 0;
        setMembers([...membersCopy]);
      } else {
        membersCopy[index].points -= points - 0;
        setMembers([...membersCopy]);
      }
    }
  };

  const addRewardHandler = (id, name, points) => {
    const data = { id, name, points };
    setRewards((prevState) => {
      return [...prevState, data];
    });
  };

  const claimRewardHandler = (data) => {
    const x = { ...data };
    const claimedData = {
      name: x.rewardName,
      points: x.rewardPoints,
      memberName: x.memberName,
    };
    setClaimed((prevState) => {
      return [...prevState, claimedData];
    });

    const filterRewards = rewards.filter(
      (reward) => reward.id.toString() !== x.rewardID.toString()
    );
    setRewards([...filterRewards]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isRegistered: isRegistered,
        showTasks: showTasks,
        showPoints: showPoints,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onEnter: enterHandler,
        onShowPoints: showPointsHandler,
        onShowTasks: showTasksHandler,
        onRegister: registerHandler,
        onAddMember: addMemberHandler,
        onRemoveMember: removeMemberHandler,
        onUpdatePoints: updatePointsHandler,
        onAddReward: addRewardHandler,
        onClaimReward: claimRewardHandler,
        MembersList: members,
        BlackList: blacklist,
        RewardsList: rewards,
        ClaimedList: claimed,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
