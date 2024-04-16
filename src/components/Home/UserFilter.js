import { Fragment, useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
const UserFilter = (props) => {
  const mo = props.filterDateValue.month;
  let day = props.filterDateValue.day;
  const year = props.filterDateValue.year;

  const authCtx = useContext(AuthContext);

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

  const [date, setDate] = useState(year + "-" + newMonth + "-" + day);
  const filterDateHandler = (e) => {
    props.filterDateHandler(e.target.value);
    setDate(e.target.value);
  };

  const filterUserHandler = (e) => {
    props.filterUserHandler(e.target.value);
  };

  const members = [...authCtx.MembersList];

  return (
    <div className="member-task-filter">
      <div className="flex-item">
        <label htmlFor="filter-user">Member</label>
        <select
          id="filter-user"
          value={props.filterUserValue}
          onChange={filterUserHandler}
        >
          <option value="All Members" id={"all"}>
            All Members
          </option>
          {members.map((member) => (
            <option
              value={member.name}
              id={member.id}
              key={member.id}
              onChange={filterUserHandler}
            >
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-item">
        <label htmlFor="date-input">Date</label>
        <input
          id="date-input"
          type="date"
          min="2022-01-01"
          max="2026-12-31"
          value={date}
          onChange={filterDateHandler}
          required
        ></input>
      </div>
    </div>
  );
};

export default UserFilter;
