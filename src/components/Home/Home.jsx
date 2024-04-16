import { Fragment, useState, useEffect, useContext } from "react";
import NewChoreItem from "./NewChoreItem";
import ChoreItem from "./ChoreItem";
import AuthContext from "../../store/auth-context";
import Rewards from "./Rewards";
import styles from "./Home.css";
import AddChore from "./AddChore";
import UserFilter from "./UserFilter";
import ToDo from "../../photos/to-do.png";
import Checklist from "../../photos/Checklist.png";
import Complete from "../../photos/Complete.png";

let firstRun = false;
let choresListCopy;
const today = new Date();
let monthDef = today.toLocaleString("en-US", { month: "long" });
let dayDef = today.toLocaleString("en-US", { day: "numeric" });
let yearDef = today.toLocaleString("en-US", { year: "numeric" });
const todayDate = { year: yearDef, month: monthDef, day: dayDef };
let todayTasksCopy = [];
let completedTasksCopy = [];

const Home = (props) => {
  const [choresList, addChore] = useState({});
  const [addChoreBtn, setAddChoreBtn] = useState(false);
  const [showTasks, setShowTasks] = useState(true);
  const [showPoints, setShowPoints] = useState(false);

  const [tasksDate, setTasksDate] = useState({
    year: yearDef,
    month: monthDef,
    day: dayDef,
  });

  const [todayTasks, setTodayTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    choresListCopy = {};
    firstRun = true;
  }, []);

  useEffect(() => {
    const { year, month, day } = tasksDate;
    if (Object.keys(choresList).length > 0) {
      if ((((choresList || {})[year] || {})[month] || {})[day]) {
        todayTasksCopy = (((choresList || {})[year] || {})[month] || {})[day]
          .uncomplete;
        const blackListed = authCtx.BlackList;
        let choreBlackListed;

        completedTasksCopy = (((choresList || {})[year] || {})[month] || {})[
          day
        ].completed;
        if (blackListed.length > 0) {
          todayTasksCopy.forEach((element) => {
            choreBlackListed = blackListed.includes(
              element.assigned.toString()
            );
            if (choreBlackListed) {
              addChore((prevState) => {
                const filterOutTask = prevState[year][month][
                  day
                ].uncomplete.filter(
                  (chore) =>
                    chore.assigned.toString() !== element.assigned.toString()
                );
                prevState[year][month][day].uncomplete = [...filterOutTask];
                return { ...prevState };
              });
            }
          });
          completedTasksCopy.forEach((element) => {
            choreBlackListed = blackListed.includes(
              element.assigned.toString()
            );
            if (choreBlackListed) {
              addChore((prevState) => {
                const filterOutTaskComp = prevState[year][month][
                  day
                ].completed.filter(
                  (chore) =>
                    chore.assigned.toString() !== element.assigned.toString()
                );
                prevState[year][month][day].completed = [...filterOutTaskComp];
                return { ...prevState };
              });
            }
          });
        }
        todayTasksCopy = (((choresList || {})[year] || {})[month] || {})[day]
          .uncomplete;
        if (filter) {
          const FTT = todayTasksCopy.filter(
            (task) => task.assigned.toString() === filter.toString()
          );
          setTodayTasks([...FTT]);
        } else {
          setTodayTasks([...todayTasksCopy]);
        }
        completedTasksCopy = (((choresList || {})[year] || {})[month] || {})[
          day
        ].completed;
        if (filter) {
          const FCT = completedTasksCopy.filter(
            (task) => task.assigned.toString() === filter.toString()
          );
          setCompletedTasks([...FCT]);
        } else {
          setCompletedTasks([...completedTasksCopy]);
        }
      } else {
        setTodayTasks([]);
        setCompletedTasks([]);
      }
    }
  }, [choresList, tasksDate, filter]);

  const authCtx = useContext(AuthContext);
  const members = [...authCtx.MembersList];

  const updateChoresList = (updatedData) => {
    const taskDate = updatedData.date;
    const month = taskDate.toLocaleString("en-US", { month: "long" });
    const day = taskDate.toLocaleString("en-US", { day: "numeric" });
    const year = taskDate.toLocaleString("en-US", { year: "numeric" });

    const datedData = {
      [year]: {
        [month]: {
          [day]: {
            uncomplete: [
              {
                ...updatedData,
              },
            ],
            completed: [],
          },
        },
      },
    };

    var dayTasks = (((datedData || {})[year] || {})[month] || {})[day]
      .uncomplete;

    var monthTasks = ((datedData || {})[year] || {})[month];

    var yearTasks = (datedData || {})[year];

    if (!firstRun) {
      if (year in choresList) {
        if (month in choresList[year]) {
          if (day in choresList[year][month]) {
            addChore((prevState) => {
              prevState[year][month][day].uncomplete = [
                ...prevState[year][month][day].uncomplete,
                ...dayTasks,
              ];
              return { ...prevState };
            });
          } else {
            addChore((prevState) => {
              prevState[year][month] = {
                ...prevState[year][month],
                ...monthTasks,
              };
              return { ...prevState };
            });
          }
        } else {
          addChore((prevState) => {
            prevState[year] = { ...prevState[year], ...yearTasks };
            return { ...prevState };
          });
        }
      } else {
        addChore((prevState) => {
          prevState = { ...prevState, ...datedData };
          return { ...prevState };
        });
      }
    } else {
      if (year in choresListCopy) {
        if (month in choresListCopy[year]) {
          if (day in choresListCopy[year][month]) {
            choresListCopy[year][month][day].uncomplete = [
              ...choresListCopy[year][month][day].uncomplete,
              ...dayTasks,
            ];
            addChore(choresListCopy);
          } else {
            choresListCopy[year][month] = {
              ...choresListCopy[year][month],
              ...monthTasks,
            };
            addChore(choresListCopy);
          }
        } else {
          choresListCopy[year] = { ...choresListCopy[year], ...yearTasks };
          addChore(choresListCopy);
        }
      } else {
        choresListCopy = { ...datedData };
        addChore(choresListCopy);
      }
    }
  };

  const addChoreHandler = (data, assignedTo) => {
    assignedTo.forEach((x) => {
      const updatedData = { ...data, assigned: x };
      updateChoresList(updatedData);
    });
    firstRun = false;
  };

  const checkTaskHandler = ({
    id,
    completed,
    assignedTo,
    day,
    month,
    year,
  }) => {
    if (id) {
      if (!completed) {
        completionHandler(id, assignedTo, day, month, year);
      } else {
        uncheckHandler(id, assignedTo, day, month, year);
      }
    }
  };

  const completionHandler = (completedTask, assignedTo, day, month, year) => {
    const filterTask = choresList[year][month][day].uncomplete.filter(
      (task) => task.id.toString() === completedTask.toString()
    );

    let filterTaskObj;
    if (filterTask.length > 1) {
      const filterUserTask = filterTask.filter(
        (x) => x.assigned.toString() === assignedTo.toString()
      );
      filterTaskObj = filterUserTask[0];
    } else {
      filterTaskObj = filterTask[0];
    }

    filterTaskObj.completed = !filterTaskObj.completed;

    authCtx.onUpdatePoints(
      filterTaskObj.assigned.toString(),
      "ADD",
      filterTaskObj.points
    );

    addChore((prevState) => {
      prevState[year][month][day].completed = [
        ...prevState[year][month][day].completed,
        filterTaskObj,
      ];
      return { ...prevState };
    });

    if (filterTask.length > 1) {
      const choresListCopy = choresList[year][month][day].uncomplete.map(
        (x) => x
      );
      let index2 = choresListCopy.findIndex(
        (x) =>
          x.id.toString() === completedTask.toString() &&
          x.assigned.toString() === assignedTo.toString()
      );

      if (index2 > -1) {
        choresListCopy.splice(index2, 1);
      }

      addChore((prevState) => {
        prevState[year][month][day].uncomplete = choresListCopy;
        return { ...prevState };
      });
    } else {
      const filterRest = choresList[year][month][day].uncomplete.filter(
        (task) => task.id.toString() !== completedTask.toString()
      );

      addChore((prevState) => {
        prevState[year][month][day].uncomplete = filterRest;
        return { ...prevState };
      });
    }
  };

  const uncheckHandler = (uncheckedTask, assignedTo, day, month, year) => {
    const filterTask = choresList[year][month][day].completed.filter(
      (task) => task.id.toString() === uncheckedTask.toString()
    );

    let filterTaskObj;
    if (filterTask.length > 1) {
      const filterUserTask = filterTask.filter(
        (x) => x.assigned.toString() === assignedTo.toString()
      );
      filterTaskObj = filterUserTask[0];
    } else {
      filterTaskObj = filterTask[0];
    }

    filterTaskObj.completed = !filterTaskObj.completed;

    authCtx.onUpdatePoints(
      filterTaskObj.assigned.toString(),
      "SUBTRACT",
      filterTaskObj.points
    );

    addChore((prevState) => {
      prevState[year][month][day].uncomplete = [
        ...prevState[year][month][day].uncomplete,
        filterTaskObj,
      ];
      return { ...prevState };
    });

    if (filterTask.length > 1) {
      const completedChoresCopy = choresList[year][month][day].completed.map(
        (x) => x
      );
      let index2 = completedChoresCopy.findIndex(
        (x) =>
          x.id.toString() === uncheckedTask.toString() &&
          x.assigned.toString() === assignedTo.toString()
      );

      if (index2 > -1) {
        completedChoresCopy.splice(index2, 1);
      }

      addChore((prevState) => {
        prevState[year][month][day].completed = completedChoresCopy;
        return { ...prevState };
      });
    } else {
      const filterRest = choresList[year][month][day].completed.filter(
        (task) => task.id.toString() !== uncheckedTask.toString()
      );

      addChore((prevState) => {
        prevState[year][month][day].completed = filterRest;
        return { ...prevState };
      });
    }
  };

  const showTasksHandler = (e) => {
    setShowPoints(false);
    setShowTasks(true);
  };

  const showPointsHandler = (e) => {
    setShowPoints(true);
    setShowTasks(false);
  };

  const newChoreBtnHandler = () => {
    setAddChoreBtn(!addChoreBtn);
  };

  const [optionsState, setOptionsState] = useState();

  const filterUserHandler = (memberValue) => {
    setOptionsState(memberValue);
    if (memberValue !== "All Members") {
      const filteredMember = members.filter(
        (member) => member.name === memberValue
      );
      const memberID = filteredMember[0].id;
      setFilter(memberID);
    } else {
      setFilter("");
    }
  };

  const filterDateHandler = (dateValue) => {
    const doo = new Date(dateValue);
    new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000));

    const newDate = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000)
    );
    let newDateMonth = newDate.toLocaleString("en-US", { month: "long" });
    let newDateDay = newDate.toLocaleString("en-US", { day: "numeric" });
    let newDateyear = newDate.toLocaleString("en-US", { year: "numeric" });
    setTasksDate({ year: newDateyear, month: newDateMonth, day: newDateDay });
  };

  const deleteChoreHandler = (
    taskID,
    assignedID,
    completed,
    day,
    month,
    year
  ) => {
    const memberID = assignedID;

    if (completed) {
      const filterTask = choresList[year][month][day].completed.filter(
        (task) => task.id.toString() === taskID.toString()
      );
      const filterOtherTask = choresList[year][month][day].completed.filter(
        (task) => task.id.toString() !== taskID.toString()
      );
      const filterUserTask = filterTask.filter(
        (x) => x.assigned.toString() !== memberID.toString()
      );
      addChore((prevState) => {
        prevState[year][month][day].completed = [
          ...filterOtherTask,
          ...filterUserTask,
        ];
        return { ...prevState };
      });
    } else {
      const filterTask = choresList[year][month][day].uncomplete.filter(
        (task) => task.id.toString() === taskID.toString()
      );
      const filterOtherTask = choresList[year][month][day].uncomplete.filter(
        (task) => task.id.toString() !== taskID.toString()
      );
      const filterUserTask = filterTask.filter(
        (x) => x.assigned.toString() !== memberID.toString()
      );
      addChore((prevState) => {
        prevState[year][month][day].uncomplete = [
          ...filterOtherTask,
          ...filterUserTask,
        ];
        return { ...prevState };
      });
    }
  };

  return (
    <Fragment>
      <div className="tasks-container">
        {authCtx.showPoints && <Rewards />}
        {authCtx.showTasks && addChoreBtn && (
          <NewChoreItem
            addChoreHandler={addChoreHandler}
            newChoreBtnHandler={newChoreBtnHandler}
            members={members}
            todayDate={todayDate}
          />
        )}
        <div className="add-chore-flex">
          {authCtx.showTasks && !addChoreBtn && (
            <AddChore newChoreBtnHandler={newChoreBtnHandler} />
          )}
          {authCtx.showTasks && (
            <UserFilter
              filterUserHandler={filterUserHandler}
              filterDateHandler={filterDateHandler}
              filterUserValue={optionsState}
              filterDateValue={tasksDate}
            />
          )}
        </div>
        {authCtx.showTasks &&
          (todayTasks.length > 0 || completedTasks.length > 0) && (
            <div className="tasks-display">
              <div className="to-do-display">
                {authCtx.showTasks && todayTasks.length > 0 && (
                  <Fragment>
                    <div>
                      <h4>
                        <mark>To-do</mark>
                      </h4>
                    </div>
                  </Fragment>
                )}
                {authCtx.showTasks &&
                  todayTasks &&
                  todayTasks.map((item) => (
                    <ChoreItem
                      key={Math.random()}
                      item={item}
                      assignedToName={members.map((x) => x)}
                      completed={false}
                      checkTaskHandler={checkTaskHandler}
                      deleteChoreHandler={deleteChoreHandler}
                    />
                  ))}
              </div>
              <div className="completed-display">
                {authCtx.showTasks && completedTasks.length > 0 && (
                  <h4>
                    <mark>Completed</mark>
                  </h4>
                )}
                {authCtx.showTasks &&
                  completedTasks &&
                  completedTasks.map((item) => (
                    <ChoreItem
                      key={Math.random()}
                      item={item}
                      assignedToName={members.map((x) => x)}
                      completed={true}
                      checkTaskHandler={checkTaskHandler}
                      deleteChoreHandler={deleteChoreHandler}
                    />
                  ))}
              </div>
              {todayTasks.length > 0 && (
                <img
                  src={Checklist}
                  className={"no-to-do checklist"}
                  height={500}
                  width={700}
                  alt="There are Chores to be done"
                  loading="lazy"
                />
              )}
              {todayTasks.length === 0 && completedTasks.length > 0 && (
                <img
                  src={Complete}
                  className={"no-to-do complete"}
                  height={500}
                  width={700}
                  alt="Completed All Chores"
                  loading="lazy"
                />
              )}
            </div>
          )}
        {authCtx.showTasks &&
          todayTasks.length === 0 &&
          completedTasks.length === 0 && (
            <div className="tasks-display">
              <p>No chores on this day..</p>
              <img
                src={ToDo}
                className={"no-to-do"}
                height={500}
                width={700}
                alt="No To-Do Chores"
                loading="lazy"
              />
            </div>
          )}
      </div>
    </Fragment>
  );
};

export default Home;
