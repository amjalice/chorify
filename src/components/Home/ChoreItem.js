import { Fragment } from "react";

const ChoreItem = (props) => {
  const month = props.item.date.toLocaleString("en-US", { month: "long" });
  const day = props.item.date.toLocaleString("en-US", { day: "numeric" });
  const year = props.item.date.toLocaleString("en-US", { year: "numeric" });

  const assignedTo = props.assignedToName.filter((x) => {
    return x.id.toString() === props.item.assigned.toString();
  });

  let assignedName;
  let assignedID;

  if (assignedTo.length > 0) {
    assignedName = assignedTo[0].name;
    assignedID = assignedTo[0].id;
  } else {
    return (
      <p className="deleted-chores-msg">
        ❌ Deleted the removed member's chore
      </p>
    );
  }

  const checksHandler = (e) => {
    props.checkTaskHandler({
      id: props.item.id,
      completed: props.completed,
      assignedTo: props.item.assigned,
      day,
      month,
      year,
    });
  };

  const deleteChoreHandler = (e) => {
    e.preventDefault();
    props.deleteChoreHandler(
      props.item.id,
      assignedID,
      props.completed,
      day,
      month,
      year
    );
  };

  return (
    <Fragment>
      <div>
        <label className="form-control">
          <input
            type="checkbox"
            key={props.item.id}
            value={props.item.name}
            checked={props.completed}
            onChange={checksHandler}
          ></input>
          <div className="chore-name">{props.item.name}</div>

          <div className="chore-details-container">
            <div className="chore-details-item">
              {assignedName}
              {" / "}
              {props.item.points}
              {props.item.points - 0 > 1 ? "pts" : "pt"}
            </div>
            <div
              className="trash"
              key={props.item.id}
              value={assignedName}
              onClick={deleteChoreHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="216"
                  y1="56"
                  x2="40"
                  y2="56"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="104"
                  y1="104"
                  x2="104"
                  y2="168"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="152"
                  y1="104"
                  x2="152"
                  y2="168"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <path
                  d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
              </svg>
            </div>
          </div>
        </label>
      </div>
    </Fragment>
  );
};

export default ChoreItem;
