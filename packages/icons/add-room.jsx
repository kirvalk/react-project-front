const React = require('react');
const PropTypes = require('prop-types');
const className = require('class-name/class-name');

const AddRoom = (props) => {
  const { toggleAddForm, isAdding } = props;
  return (
    <svg
      className={className({ name: 'add-icon', mods: { active: isAdding } })}
      onClick={toggleAddForm}
      viewBox="0 0 66.915 66.915"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M49.221,31.5h-14.5V17.881c0-1.104-0.896-2-2-2s-2,0.896-2,2V31.5h-13.5c-1.104,0-2,0.896-2,2s0.896,2,2,2h13.5v14.381
        c0,1.104,0.896,2,2,2s2-0.896,2-2V35.5h14.5c1.104,0,2-0.896,2-2S50.325,31.5,49.221,31.5z"
      />
      <path d="M33.457,0C15.009,0,0,15.008,0,33.457s15.009,33.458,33.457,33.458c18.449,0,33.458-15.009,33.458-33.458
        C66.915,15.009,51.907,0,33.457,0z M33.457,62.915C17.215,62.915,4,49.7,4,33.457C4,17.215,17.215,4,33.457,4
        C49.7,4,62.915,17.214,62.915,33.457S49.7,62.915,33.457,62.915z"
      />
    </svg>
  );
};

AddRoom.propTypes = {
  toggleAddForm: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
};
module.exports = AddRoom;
