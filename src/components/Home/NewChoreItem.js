import { useState, useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

const NewChoreItem = (props) => {
  let mo = props.todayDate.month;
  let day = props.todayDate.day;
  const year = props.todayDate.year;

  let month = getMonthFromString(mo);
  let newMonth = month.toString();
  if (month < 10) {
    newMonth = 0 + newMonth;
  }

  if (day < 10) {
    day = 0 + day;
  }

  function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  const [taskName, setTaskName] = useState("");
  const [taskNameIsValid, setTaskNameIsValid] = useState(null);
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState(year + "-" + newMonth + "-" + day);
  const [frequency, setFrequency] = useState("One-Time");
  const [assigned, setAssigned] = useState([]);
  const [completed, setCompleted] = useState(false);

  const authCtx = useContext(AuthContext);

  const taskInputRef = useRef();

  const taskNameChangeHandler = (e) => {
    setTaskName(e.target.value);
  };

  const validateTaskName = () => {
    if (taskName.trim().length > 1) {
      setTaskNameIsValid(true);
    }
  };

  const pointsChangeHandler = (e) => {
    setPoints(e.target.value);
  };

  const dateChangeHandler = (event) => {
    setDueDate(event.target.value);
  };

  const [active, setActive] = useState([]);

  const assignHandler = (e) => {
    e.preventDefault();
    let filteredAssigned = assigned.filter((x) => {
      return x.toString() === e.target.id.toString();
    });
    if (filteredAssigned.length === 0) {
      setAssigned((prevState) => {
        return [...prevState, e.target.id];
      });
      setActive((prevState) => {
        return [...prevState, e.target.id];
      });
    } else {
      filteredAssigned = assigned.filter((x) => {
        return x.toString() !== e.target.id.toString();
      });
      setAssigned([...filteredAssigned]);
      let filteredActive = active.filter(
        (x) => x.toString() !== e.target.id.toString()
      );
      setActive([...filteredActive]);
    }
  };

  const frequencyHandler = (e) => {
    setFrequency(e.target.value);
  };

  const cancelHandler = (e) => {
    props.newChoreBtnHandler();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const doo = new Date(dueDate);
    if (!taskNameIsValid) {
      taskInputRef.current.focus();
    } else {
      const taskData = {
        name: taskName,
        points: points,
        date: new Date(
          doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000)
        ),
        frequency: frequency,
        completed: completed,
        id: Math.random(),
      };

      const assignedArray = assigned;
      props.addChoreHandler(taskData, assignedArray);
      props.newChoreBtnHandler();
      setTaskName("");
      setPoints("");
      setAssigned([]);
      setFrequency("One-Time");
      setCompleted(false);
    }
  };

  return (
    <form className="new-chore-form" onSubmit={submitHandler}>
      <div className="cancel-btn" onClick={cancelHandler}>
        X
      </div>
      <div>
        <label htmlFor="task-input">Task</label>
        <input
          ref={taskInputRef}
          id="task-input"
          type="text"
          value={taskName}
          onChange={taskNameChangeHandler}
          onBlur={validateTaskName}
          required
        ></input>
        <label htmlFor="points-input">Points</label>
        <input
          id="points-input"
          type="number"
          min="0"
          value={points}
          onChange={pointsChangeHandler}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="date-input">Date</label>
        <input
          id="date-input"
          type="date"
          min="2024-01-01"
          value={dueDate}
          onChange={dateChangeHandler}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="repeat-input">Repeat</label>
        <select id="repeat-input" onChange={frequencyHandler}>
          <option value="One-Time">Once</option>
          <option value="daily" disabled>
            Daily - capability coming soon!
          </option>
          <option value="weekly" disabled>
            Weekly - capability coming soon!
          </option>
          <option value="biweekly" disabled>
            Bi-Weekly - capability coming soon!
          </option>
          <option value="monthly" disabled>
            Monthly - capability coming soon!
          </option>
        </select>
      </div>
      <div>
        <label>Assign To</label>
        <div className="assign-container">
          {authCtx.MembersList.map((member) => (
            <button
              className={
                active.includes(member.id.toString())
                  ? "assign-btn assign-active"
                  : "assign-btn"
              }
              value={member.name}
              id={member.id}
              key={Math.random()}
              onClick={assignHandler}
            >
              {member.name}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!taskName || !points || assigned.length === 0}
        className="add-chore-btn"
        type="submit"
      >
        Add Chore
      </button>
    </form>
  );
};

export default NewChoreItem;
