const AddChore = (props) => {
  const newChoreBtnHandler = (e) => {
    props.newChoreBtnHandler();
  };
  return (
    <button className="new-chore-btn" onClick={newChoreBtnHandler}>
      {/* <span className="plus">+</span> */}
      <span className="plus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>51.Add</title>
          <g id="_51.Add" data-name="51.Add">
            <path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z" />
            <rect x="11" y="6" width="2" height="12" />
            <rect x="6" y="11" width="12" height="2" />
          </g>
        </svg>
      </span>
      <span className="NewChoreText"> New Chore</span>
    </button>
  );
};

export default AddChore;
